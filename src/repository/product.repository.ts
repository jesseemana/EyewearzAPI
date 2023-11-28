import ProductModel from '../models/product.model'
import { injectable } from 'inversify'

@injectable()
export class ProductRepository {
  private readonly _model = ProductModel

  async findAllProducts() {
    return this._model.find({})
  }

  async findSunglasses() {
    return this._model.find({})
  }

  async getSingleProdcut(id: string) {
    return this._model.findOne({ id })
  }
}
