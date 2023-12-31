import ProductModel, { Product } from '../models/product.model'
import cloudinary from '../utils/cloudinary'

async function uploadPicture(picture: string) {
  const response = await cloudinary.uploader.upload(picture)
  return {
    image: response.url,
    cloudinary_id: response.public_id,
  }
}

async function createProduct(data: Product) {
  return ProductModel.create(data)
}

async function getAllProducts() {
  return ProductModel.find({})
}

async function filterCategory(query: string) {
  return ProductModel.find({ category: query })
}

async function getOneProduct(id: string) {
  return ProductModel.findById(id)
}

export default {
  uploadPicture,
  createProduct,
  getAllProducts,
  getOneProduct,
  filterCategory,
}
