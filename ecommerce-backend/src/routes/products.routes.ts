import { Router } from 'express';
import { getProductos, getProductoById, getCategorias } from '../controllers/products.controller';

const router = Router();

// GET /api/productos/categorias  ← debe ir ANTES de /:id
router.get('/categorias', getCategorias);

// GET /api/productos?search=texto&category=combos
router.get('/', getProductos);

// GET /api/productos/:id
router.get('/:id', getProductoById);

export default router;