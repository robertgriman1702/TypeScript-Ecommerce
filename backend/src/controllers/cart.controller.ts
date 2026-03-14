import { Request, Response } from 'express';
import { supabase } from '../config/supabaseClient';

// Obtiene o crea el carrito del usuario
const getOrCreateCart = async (userId: string) => {
  let { data: cart } = await supabase
    .from('cart')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (!cart) {
    const { data: newCart } = await supabase
      .from('cart')
      .insert({ user_id: userId })
      .select('id')
      .single();
    cart = newCart;
  }
  return cart!.id as number;
};

// GET /api/cart  — obtiene el carrito con productos
export const getCart = async (req: Request, res: Response) => {
  try {
    const cartId = await getOrCreateCart(req.user!.id);

    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        product_id,
        productos (id, name, price, image, stock)
      `)
      .eq('cart_id', cartId);

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cart  — agrega o incrementa un producto
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    if (!product_id) return res.status(400).json({ error: 'product_id es requerido' });

    const cartId = await getOrCreateCart(req.user!.id);

    // Si ya existe, suma la cantidad
    const { data: existing } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cartId)
      .eq('product_id', product_id)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      return res.json(data);
    }

    const { data, error } = await supabase
      .from('cart_items')
      .insert({ cart_id: cartId, product_id, quantity })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/cart/:itemId  — actualiza cantidad
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1)
      return res.status(400).json({ error: 'Cantidad inválida' });

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart/:itemId  — elimina un item
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const { error } = await supabase.from('cart_items').delete().eq('id', itemId);
    if (error) throw error;
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart  — vacía todo el carrito
export const clearCart = async (req: Request, res: Response) => {
  try {
    const cartId = await getOrCreateCart(req.user!.id);
    const { error } = await supabase.from('cart_items').delete().eq('cart_id', cartId);
    if (error) throw error;
    res.json({ message: 'Carrito vaciado' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};