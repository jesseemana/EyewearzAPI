// import { nanoid } from 'nanoid'
import { getModelForClass, prop } from '@typegoose/typegoose'

export class Product {
  // @prop({ required: true, default: nanoid() })
  // product_id: string

  @prop({ required: true })
  name: string

  @prop({ required: true })
  image: string

  @prop({ required: true })
  cloudinary_id: string

  @prop({ required: true })
  category: string

  @prop({ required: true })
  gender: string

  @prop({ required: true })
  description: string

  @prop({ required: true })
  price: string
}

const ProductModel = getModelForClass(Product, {
  schemaOptions: {
    timestamps: true
  }
})

export default ProductModel
