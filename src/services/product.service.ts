import ProductModel, { Product } from '../models/product.model'

async function getAllProducts() {
  return ProductModel.find({}).limit(6)
}

async function findById(id: string) {
  return ProductModel.findById(id)
}

async function createProduct(data: Product) {
  return ProductModel.create(data)
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
  createProduct,
  getAllProducts,
}
