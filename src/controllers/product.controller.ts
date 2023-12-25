import { Request, Response } from 'express'
import ProductService from '../services/product.service'
import { ProductInput, product_schema } from '../schema/product'

export async function getProductsHandler(_: Request, res: Response) {
  try {
    const all_products = await ProductService.getAllProducts()
    res.status(200).send(all_products)
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

export async function createProduct(
  req: Request<{}, {}, ProductInput>, 
  res: Response
) {
  const body = product_schema.parse(req.body)
  try {
    if (req.file) {
      const response = await ProductService.uploadPicture(req.file.path)
      const product = await ProductService.createProduct({ ...body, ...response })
      return res.status(201).send(`Product ${product.name} created`)
    }
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

export async function getOneProduct(req: Request, res:Response) {
  const { id } = req.params
  try {
    const product = await ProductService.getOneProduct(id)
    res.status(200).send(product)
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}
