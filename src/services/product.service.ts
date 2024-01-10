import { ProductModel } from '../models'
import { Product } from '../models/product.model'

async function getAllProducts() {
  return ProductModel.find({}).limit(6)
}

async function findById(id: string) {
  return ProductModel.findById(id)
}

async function createProduct(data: Product) {
  return ProductModel.create(data)
}

async function filterQuery(query: string) {
  return ProductModel.find({ query })
}

async function filterByCategory(category: string) {
  return ProductModel.find({ category })
}

export default {
  findById,
  filterQuery,
  createProduct,
  getAllProducts,
  filterByCategory,
}
