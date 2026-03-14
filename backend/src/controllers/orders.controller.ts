import { Request, Response } from 'express';
import { supabase } from '../config/supabaseClient';

// POST /api/orders  — crea una orden desde el carrito actual
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    // 1. Obtener carrito con productos
    const { data: cart } = await supabase
      .from('cart')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (!cart) return res.status(400).json({ error: 'No tienes carrito activo' });

    const { data: items, error: itemsError } = await supabase
      .from('cart_items')
      .select('quantity, product_id, productos(price, stock)')
      .eq('cart_id', cart.id);

    if (itemsError || !items?.length)
      return res.status(400).json({ error: 'El carrito está vacío' });

    // 2. Calcular total
    const total = items.reduce((sum, item) => {
      const price = (item.productos as any)?.price ?? 0;
      return sum + price * item.quantity;
    }, 0);

    // 3. Crear la orden
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({ user_id: userId, total, status: 'pending' })
      .select()
      .single();

    if (orderError) throw orderError;

    // 4. Crear los order_items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: (item.productos as any)?.price ?? 0,
    }));

    const { error: oiError } = await supabase.from('order_items').insert(orderItems);
    if (oiError) throw oiError;

    // 5. Vaciar el carrito
    await supabase.from('cart_items').delete().eq('cart_id', cart.id);

    res.status(201).json({ message: 'Orden creada exitosamente', order });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders  — historial de órdenes del usuario
export const getOrders = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, total, status, created_at,
        order_items (
          quantity, price,
          productos (id, name, image)
        )
      `)
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders/:id  — detalle de una orden
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, total, status, created_at,
        order_items (
          quantity, price,
          productos (id, name, image)
        )
      `)
      .eq('id', req.params.id)
      .eq('user_id', req.user!.id)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Orden no encontrada' });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};