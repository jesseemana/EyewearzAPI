import ProductModel from "../models/product.model"

async function getAllProducts() {
  return ProductModel.find({})
}

async function getOneProduct(id: string) {
  return ProductModel.findById(id)
}

export default {
  getAllProducts,
  getOneProduct
}
