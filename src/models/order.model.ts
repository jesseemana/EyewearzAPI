import { User } from './user.model'
import { getModelForClass, prop, Ref } from '@typegoose/typegoose'

export class Order {

  @prop({ ref: () => User })
  user: Ref<User>

  @prop({ required: true })
  name: string

  @prop({ required: true })
  email: string

  @prop({ required: true })
  phone: string

  @prop({ required: true })
  address: string

  @prop({ required: true })
  location: string

}

const OrderModel = getModelForClass(Order)
export default OrderModel
