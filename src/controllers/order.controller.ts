import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { CheckoutType } from '../schema/order.schema'
import { orderService } from '../services'
import { initiatePayment } from '../helpers'
import { log } from '../utils'

async function getOrders(req: Request, res: Response) {}

async function getSingleOrder(req: Request, res: Response) {}

async function createOrder(req: Request<{}, {}, CheckoutType>, res: Response) {
  const body = req.body
  const user_id = req.userId

  const new_order = await orderService.CreateOrder({
    user: new mongoose.Types.ObjectId(user_id),
    status: 'placed',
    total_amount: body.total_amount,
    delivery_details: body.delivery_details,
  })

  const payload = {
    first_name: body.delivery_details.first_name,
    last_name: body.delivery_details.last_name,
    email: body.delivery_details.email,
    customization: { 
      title: 'Online Purchase', 
      description: 'Purchase from website', 
    },
    currency: 'MWK',
    amount: body.total_amount,
    tx_ref: new_order._id.toString(),
  }

  const response = await initiatePayment(payload)

  await new_order.save()

  res.status(200).json({ url: response.data.checkout_url })
}

async function updateOrder(req: Request, res: Response) {}


export default {
  getSingleOrder,
  getOrders,
  updateOrder,
  createOrder,
}
