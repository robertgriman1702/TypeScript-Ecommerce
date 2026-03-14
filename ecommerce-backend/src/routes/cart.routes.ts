import { Router } from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cart.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas del carrito requieren autenticación
router.use(authMiddleware);

router.get('/',           getCart);
router.post('/',          addToCart);
router.put('/:itemId',    updateCartItem);
router.delete('/clear',   clearCart);
router.delete('/:itemId', removeFromCart);

export default router;