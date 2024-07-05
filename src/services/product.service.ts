import { FilterQuery, UpdateQuery } from 'mongoose'
import ProductModel, { IProduct } from '../models/product.model'

type FilterType = { 
  limit: number 
  skip: number 
  query: any 
}

async function getByFilter({ limit, skip, query }: FilterType) {
  const sunglasses = await ProductModel.find(query)
    .sort({ createdAt: 'desc' })
    .limit(limit)
    .skip(skip)
    
  return sunglasses
}

async function countByFilter(filter: any) {
  const total = await ProductModel.countDocuments(filter)
  return total
}

async function getAllProducts(limit: number, skip: number) {
  const products = await ProductModel.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)

  return products
}

async function countTotalProducts() {
  const total = await ProductModel.estimatedDocumentCount()
  return total
}

async function getFeaturedProducts(limit: number, skip: number) {
  const products = await ProductModel.find({ featured: true })
    .sort({ createdAt: 'desc' })
    .limit(limit)
    .skip(skip)

  return products
}

async function findById(id: string) {
  const product = await ProductModel.findById(id)
  return product
}

async function createProduct(data: Partial<IProduct>) {
  const product = await ProductModel.create(data)
  return product
}

async function editProduct(
  filter: FilterQuery<IProduct>, 
  update: UpdateQuery<IProduct>
) {
  const product = await ProductModel.findByIdAndUpdate(filter, update)
  return product
}

export default {
  countTotalProducts,
  getAllProducts,
  editProduct,
  createProduct,
  countByFilter,
  getByFilter,
  getFeaturedProducts,
  findById,
}
