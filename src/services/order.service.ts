import Order, { IOrder } from '../models/order.model'

async function CreateOrder(data: Partial<IOrder>) {
  const order = new Order(data)
  return order
}

export default { CreateOrder }
