import { Request, Response } from 'express';
import { supabase } from '../config/supabaseClient';

// POST /api/auth/register
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({
    message: 'Usuario registrado. Revisa tu email para confirmar.',
    user: { id: data.user?.id, email: data.user?.email },
  });
};

// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(401).json({ error: 'Credenciales incorrectas' });

  res.json({
    token: data.session.access_token,
    user: { id: data.user.id, email: data.user.email },
  });
};

// GET /api/auth/me  (requiere token)
export const me = async (req: Request, res: Response) => {
  res.json({ user: req.user });
};

// POST /api/auth/logout
export const logout = async (req: Request, res: Response) => {
  await supabase.auth.signOut();
  res.json({ message: 'Sesión cerrada' });
};