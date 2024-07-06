import mongoose, { Document, Schema, InferSchemaType } from 'mongoose'

type OrderType = InferSchemaType<typeof order_schema> 

export interface IOrder extends OrderType, Document {}

const order_schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    total_amount: { type: String, required: true, },
    delivery_details: {
      first_name: { type: String, required: true, },
      last_name: { type: String, required: true, },
      phone: { type: String, required: true, },
      email: { type: String, required: true, },
      location: { type: String, required: true, },
    },
    status: {
      type: String,
      enum: ['placed', 'paid', 'en-route', 'delivered'],
      required: true
    },
    createdAt: { type: Date, default: Date.now }
  },
)

const Order = mongoose.model<IOrder>('Order', order_schema)

export default Order
