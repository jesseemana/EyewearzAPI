import ProductModel, { Product } from '../models/product.model'
import cloudinary from '../utils/cloudinary'

async function getAllProducts() {
  return ProductModel.find({})
}

async function findById(id: string) {
  return ProductModel.findById(id)
}

async function createProduct(data: Product) {
  return ProductModel.create(data)
}

async function uploadPicture(picture: string): Promise<UploadResponse> {
  const response = await cloudinary.uploader.upload(picture)
  return {
    image: response.url,
    cloudinary_id: response.public_id,
  }
}

async function filterByGender(gender: string) {
  return ProductModel.find({ gender })
}

async function filterByCategory(category: string) {
  return ProductModel.find({ category })
}

export default {
  findById,
  filterByGender,
  filterByCategory,
  uploadPicture,
  createProduct,
  getAllProducts,
}
