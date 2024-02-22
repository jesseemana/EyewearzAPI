import { Router } from 'express'
import { require_admin } from '../middleware'
import { OrderController } from '../controllers'

const router = Router()

router.get('/', require_admin, OrderController.get_orders)

router.post('/checkout', OrderController.create_order)

router.get('/:id', require_admin, OrderController.get_single_order)

export default router
