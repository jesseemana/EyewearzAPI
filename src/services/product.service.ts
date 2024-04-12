import { ProductModel } from '../models'
import { Product } from '../models/product.model'

async function getAllProducts(limit: number, skip: number) {
  const products = ProductModel.find({})
    .limit(limit)
    .skip(skip);

  return products;
}

async function countTotalProducts() {
  const total = await ProductModel.estimatedDocumentCount();
  return total;
}

async function findById(id: string) {
  const product = ProductModel.findById(id);
  return product;
}

async function createProduct(data: Product) {
  const product = ProductModel.create(data);
  return product;
}

async function filterQuery(query: string) {
  const product = ProductModel.find({ query });
  return product;
}

async function filterByCategory(category: string) {
  const product =ProductModel.find({ category: category });
  return product;
}

export default {
  countTotalProducts,
  createProduct,
  getAllProducts,
  findById,
  filterQuery,
  filterByCategory,
}
