import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productosRoutes from './routes/products.routes';
import authRoutes     from './routes/auth.routes';
import cartRoutes     from './routes/cart.routes';
import ordersRoutes   from './routes/orders.routes';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3000;

// Acepta cualquier subdominio de vercel.app y localhost
const allowedOrigins = [
  /^https:\/\/.*\.vercel\.app$/,
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // permite requests sin origin (ej: Postman)
    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    if (allowed) callback(null, true);
    else callback(new Error(`CORS bloqueado para: ${origin}`));
  },
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