import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productosRoutes from '../src/routes/products.routes';
import authRoutes     from './routes/auth.routes';
import cartRoutes     from './routes/cart.routes';
import ordersRoutes   from './routes/orders.routes';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// ─── Rutas ────────────────────────────────────────────────────────────────────
app.use('/api/productos', productosRoutes);
app.use('/api/auth',      authRoutes);
app.use('/api/cart',      cartRoutes);
app.use('/api/orders',    ordersRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));