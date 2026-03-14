import { Router } from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/orders.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/',     getOrders);
router.post('/',    createOrder);
router.get('/:id',  getOrderById);

export default router;