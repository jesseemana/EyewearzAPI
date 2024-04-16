import { Router } from 'express';
import { requireAdmin } from '../middleware';
import { OrderController } from '../controllers';

const router = Router();

router.get('/', requireAdmin, OrderController.getOrders);

router.post('/checkout', OrderController.createOrder);

router.get('/:id', requireAdmin, OrderController.getSingleOrder);

export default router;
