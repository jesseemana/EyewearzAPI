import { Request, RequestHandler, Response } from 'express'
import { uploadPicture } from '../utils'
import { ProductService } from '../services'
import { ProductInput } from '../schema/product'

const get_all_products_handler: RequestHandler = async (_: Request, res: Response) => {
  try {
    const all_products = await ProductService.getAllProducts()
    return res.status(200).send(all_products)
  } catch (error) {
    return res.status(500).send('Internal Server Error!')
  }
}

const get_single_product_handler: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await ProductService.findById(id)
    return res.status(200).send(product)
  } catch (error) {
    return res.status(500).send('Internal Server Error!')
  }
}

const create_product_handler: RequestHandler = async (
  req: Request<{}, {}, ProductInput>, 
  res: Response
) => {
  try {
    const body = req.body

    if (req.file) {
      const response = await uploadPicture(req.file.path)
      const product = await ProductService.createProduct({ ...body, ...response })
      return res.status(201).send(`Product ${product.name} created.`)
    }
    
    return res.status(400).send('Please provide a picture for the product.');
  } catch (error) {
    return res.status(500).send('Internal Server Error!')
  }
}

const filter_gender_handler: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { query } = req.params
    const found_products = await ProductService.filterQuery(query) 
    if (found_products.length === 0) 
      return res.status(404).send(`No items in ${query} category were found.`)
    
    return res.status(200).send(found_products)
  } catch (error) {
    return res.status(500).send('Internal Server Error!')
  }
}

export default {
  filter_gender_handler,
  create_product_handler,
  get_all_products_handler,
  get_single_product_handler,
}
