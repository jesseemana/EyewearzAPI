import { Request, Response } from 'express'
import productService from '../services/product.service'

export async function getProductsHandler(_: Request, res: Response) {
  try {
    const all_products = await productService.getAllProducts()
    res.status(200).send(all_products)
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}
  
export async function getOneProduct(req: Request, res:Response) {
  const { id } = req.params
  try {
    const product = await productService.getOneProduct(id)
    res.status(200).send(product)
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}
