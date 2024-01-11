import { Request, Response } from 'express'
import { uploadPicture } from '../utils'
import { product_schema } from '../schema'
import { ProductService } from '../services'
import { ProductInput } from '../schema/product'

export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const all_products = await ProductService.getAllProducts()
    return res.status(200).send(all_products)
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

export const getOneProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const product = await ProductService.findById(id)
    return res.status(200).send(product)
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

export const createProduct = async (
  req: Request<{}, {}, ProductInput>, 
  res: Response
) => {
  try {
    const user = res.locals.user
    const body = product_schema.parse(req.body)

    if (user.role !== 'admin') 
      return res.status(401).send('Only admins can create products.')

    if (req.file) {
      const response = await uploadPicture(req.file.path)
      const product = await ProductService.createProduct({ ...body, ...response })
      return res.status(201).send(`Product ${product.name} created.`)
    }
    
    throw new Error('Please provide a picture for the product.');
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

export const filterGender = async (req: Request, res: Response) => {
  try {
    const { query } = req.params
    const found_products = await ProductService.filterQuery(query) 
    if (found_products.length === 0) 
      return res.status(404).send(`No items in ${query} category were found.`)
    
    return res.status(200).send(found_products)
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}
