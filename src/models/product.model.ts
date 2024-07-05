import mongoose, { Schema, Document, InferSchemaType } from 'mongoose'

type ProductType= InferSchemaType<typeof product_schema>

export interface IProduct extends ProductType, Document {}

const product_schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    cloudinary_id: { type: String, required: true },
    price: { type: Number, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['sunglasses', 'prescription', 'blue light', 'kids'] 
    },
    gender: { 
      type: String, 
      required: true, 
      enum: ['male', 'female', 'unisex'] 
    },
    description: { type: String, required: true },
  },
  {
    timestamps: true
  }
)

const ProductModel = mongoose.model<IProduct>('Product', product_schema)

export default ProductModel
