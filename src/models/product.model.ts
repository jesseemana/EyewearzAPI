// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { getModelForClass, prop, index } from '@typegoose/typegoose';

@index({ product_id: 1 })

export class Product {
  @prop({ required: true, default: uuidv4() })
  product_id: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  image_path: string;

  @prop({ required: true })
  cloudinary_id: string;

  @prop({ required: true })
  price: string;

  @prop({ required: true })
  category: string;

  @prop({ default: false })
  featured: boolean;

  @prop({ required: true })
  gender: string;

  @prop({ required: true })
  description: string;
}

const ProductModel = getModelForClass(Product, {
  schemaOptions: {
    timestamps: true,
  }
})

export default ProductModel;
