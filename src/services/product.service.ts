import { FilterQuery, UpdateQuery } from 'mongoose'
import ProductModel, { Product } from '../models/product.model'
import { FilterType } from '../types'

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

async function getByFilter({ limit, skip, filter }: FilterType) {
  const sunglasses = await ProductModel.find({ category: filter })
    .sort({ createdAt: 'desc' })
    .limit(limit)
    .skip(skip)
    
  return sunglasses
}

async function countByFilter(filter: string) {
  const total = await ProductModel.countDocuments({ category: filter })
  return total
}

async function findById(id: string) {
  const product = await ProductModel.findById(id)
  return product
}

async function findProduct(id: string) {
  const product = await ProductModel.findOne({ product_id: id })
  return product
}

async function createProduct(data: Partial<Product>) {
  const product = await ProductModel.create(data)
  return product
}

async function editProduct(filter: FilterQuery<Product>, update: UpdateQuery<Product>) {
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
  findProduct,
}
