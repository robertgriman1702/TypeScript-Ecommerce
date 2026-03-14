import { Request, Response } from 'express';
import { supabase } from '../config/supabaseClient';

// GET /api/productos
export const getProductos = async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query;

    let query = supabase.from('productos').select('*').order('created_at', { ascending: false });

    if (category && category !== 'Todas') {
      query = query.eq('category', category as string);
    }

    if (search && (search as string).trim() !== '') {
      query = query.ilike('name', `%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (error: any) {
    console.error('Error en getProductos:', error.message);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// GET /api/productos/:id
export const getProductoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(data);
  } catch (error: any) {
    console.error('Error en getProductoById:', error.message);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// GET /api/productos/categorias
export const getCategorias = async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('category');

    if (error) throw error;

    const categorias = ['Todas', ...new Set(data.map((p) => p.category).filter(Boolean))];

    res.json(categorias);
  } catch (error: any) {
    console.error('Error en getCategorias:', error.message);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};