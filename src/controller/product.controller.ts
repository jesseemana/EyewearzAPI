import { Request, Response } from 'express'
import { controller, httpGet } from 'inversify-express-utils'
import { ProductService } from '../services/product.service'

@controller('/products')
export class ProductController {
  private readonly _productService: ProductService

  constructor(_productService: ProductService) { this._productService = _productService }

  @httpGet('/')
  async getProductsHandle(_: Request, res: Response) {
    try {
      const all_products = await this._productService.getAllProducts()
      res.status(200).send(all_products)
    } catch (error) {
      return res.status(500).send('Internal server error!')
    }
  }
  
  @httpGet('/:id')
  async getOneProduct(req: Request, res:Response) {
    const { id } = req.params
    try {
      const product = await this._productService.getOneProduct(id)
      res.status(200).send(product)
    } catch (error) {
      return res.status(500).send('Internal server error!')
    }
  }

  @httpGet('/sunglasses')
  async getSunglasses(req: Request, res: Response) {
    try {
      const sunglasses = await this._productService.getSunglasses()
      res.status(200).send(sunglasses)
    } catch (error) {
      return res.status(500).send('Internal server error!')
    }
  }
}
