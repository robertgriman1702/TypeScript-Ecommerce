import { Router } from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cart.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/',           getCart);
router.post('/',          addToCart);
router.post('/clear',     clearCart);    
router.put('/:itemId',    updateCartItem);
router.delete('/:itemId', removeFromCart);

export default router;