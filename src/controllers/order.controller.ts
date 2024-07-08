import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { CheckoutType } from '../schema/order.schema'
import { orderService } from '../services'
import { initiatePayment } from '../helpers'
import { PaychanguResponseType } from '../helpers/payment'
import { log } from '../utils'

async function getOrders(req: Request, res: Response) {}

async function getSingleOrder(req: Request, res: Response) {}

async function createOrder(req: Request<{}, {}, CheckoutType>, res: Response) {
  // TODO: implement item/cart being checked out
  const new_order = await orderService.CreateOrder({
    user: new mongoose.Types.ObjectId(req.userId),
    status: 'placed',
    total_amount: req.body.total_amount,
    delivery_details: req.body.delivery_details,
  })

  const payload = {
    first_name: req.body.delivery_details.first_name,
    last_name: req.body.delivery_details.last_name,
    email: req.body.delivery_details.email,
    customization: { 
      title: 'Online Purchase', 
      description: 'Purchase from website', 
    },
    currency: 'MWK',
    amount: req.body.total_amount,
    tx_ref: new_order._id.toString(),
  }

  // initiate the payment with the Paychangu API
  const response = await initiatePayment(payload)
  const results: PaychanguResponseType = await response.json()
  if (response.ok) {
    await new_order.save()
    return res.status(200).json({ 
      url: results.data.checkout_url 
    })
  }

  res.status(400).json({ msg: 'failed to process payment' })
}

async function updateOrder(req: Request, res: Response) {}


export default {
  getSingleOrder,
  getOrders,
  updateOrder,
  createOrder,
}
