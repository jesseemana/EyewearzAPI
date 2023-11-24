import { getModelForClass, prop } from '@typegoose/typegoose'
import { nanoid } from 'nanoid'

export class Product {
  @prop({ required: true, default: () => nanoid() })
  id: string

  @prop({ required: true })
  name: string

  @prop({ required: true })
  image: string

  @prop({ required: true })
  description: string

  @prop({ required: true })
  price: string
}

const ProductModel = getModelForClass(Product, {
  SchemaOptions: {
    timestamps: true
  }
})

export default ProductModel
