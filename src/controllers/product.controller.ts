import { Request, Response } from 'express'
import ProductService from '../services/product.service'
import { ProductInput, product_schema } from '../schema/product'

export async function getAllProducts(_: Request, res: Response) {
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
    const product = await ProductService.findById(id)
    return res.status(200).send(product)
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

export async function filterCategory(req: Request, res: Response) {
  const category = String(req.query.category)
  try {
    const found_products = await ProductService.filterByCategory(category)
    if (found_products.length === 0) 
      return res.status(404).send(`No items in ${category} category were found.`)
    return res.status(200).send(found_products)
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

export async function filterGender(req: Request, res: Response) {
  const gender = String(req.query.gender)
  try {
    const found_products = await ProductService.filterByGender(gender)
    if (found_products.length === 0) 
      return res.status(404).send(`No items in ${gender} category were found.`)
    return res.status(200).send(found_products)
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
        return res.status(201).send(`Product ${product.name} created.`)
      }
    }
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}
