import { ProductRepository } from '../repository/product.repository'
import { injectable } from 'inversify'

@injectable()
export class ProductService {
  private readonly _productRepository: ProductRepository

  constructor ( _productRepository: ProductRepository) {
    this._productRepository = _productRepository
  }

  async getAllProducts() {
    return this._productRepository.findAllProducts()
  }

  async getSunglasses() {
    return this._productRepository.findSunglasses()
  }

  async getOneProduct(id: string) {
    return this._productRepository.getSingleProdcut(id)
  }
}
