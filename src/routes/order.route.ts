import { Router } from 'express'
import { requireAdmin, requireUser } from '../middleware'
import { OrderController } from '../controllers'

const router = Router()

router.get('/', requireAdmin, OrderController.getOrders)

router.route('/:id')
    .put(requireAdmin, OrderController.updateOrder)
    .get(requireAdmin, OrderController.getSingleOrder)

router.post('/checkout', requireUser, OrderController.createOrder)

export default router
