import { Router } from 'express'
import { requireAdmin, requireUser, validateInput } from '../middleware'
import { OrderController } from '../controllers'
import { checkOutSchema, orderStatusSchema } from '../schema/order.schema'

const router = Router()

router.get('/', requireAdmin, OrderController.getOrders)

router.route('/:id')
  .get(requireAdmin, OrderController.getSingleOrder)
  .put([requireAdmin, validateInput(orderStatusSchema)], OrderController.updateOrder)

router.post(
  '/checkout', 
  [requireUser, validateInput(checkOutSchema)], 
  OrderController.createOrder
)

export default router
