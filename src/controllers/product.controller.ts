import { Request, Response } from 'express'
import ProductService from '../services/product.service'
import { ProductInput, product_schema } from '../schema/product'

export async function getProductsHandler(req: Request, res: Response) {
  try {
    const all_products = await ProductService.getAllProducts()
    return res.status(200).send(all_products)
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

export async function getOneProduct(req: Request, res: Response) {
  const { id } = req.params
  try {
    const product = await ProductService.getOneProduct(id)
    res.status(200).send(product)
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

export async function filterProduct(req: Request, res: Response) {
  const { category } = req.query
  try {
    const found_item = await ProductService.filterCategory(String(category))
    if (found_item.length === 0) {
      return res.status(404).send(`Item in ${category}'s category not found.`)
    }
    res.status(200).send(found_item)
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
      if (response) {
        const product = await ProductService.createProduct({ ...body, ...response })
        return res.status(201).send(`Product ${product.name} created`)
      }
    }
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}
