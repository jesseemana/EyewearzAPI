import { Request, Response } from 'express'
import { uploadPicture } from '../utils'
import { ProductInput, ProductParam } from '../schema/product.schema'
import { ProductService } from '../services'

const PRODUCT_LIMIT = 20

async function createProductHandler(
  req: Request<{}, {}, ProductInput>, 
  res: Response
) {
  if (req.file) {
    const upload_response = await uploadPicture(req.file.path)
    const product = await ProductService.createProduct({ 
      ...req.body, 
      ...upload_response 
    })
    return res.status(201).json(product)
  }
  res.status(400).json({ 
    msg: 'Please provide a picture for the product.' 
  })
}

async function getAllProductsHandler(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1
  const skip = (page - 1) * PRODUCT_LIMIT
  const total = await ProductService.countTotalProducts()

  const products = await ProductService.getAllProducts(PRODUCT_LIMIT, skip)

  res.status(200).json({
    products: products,
    pagination: {
      total,
      page,
      total_pages: Math.ceil(total/PRODUCT_LIMIT),
    }
  })
}

async function editProductHandler(
  req: Request<ProductInput['params'], {}, ProductInput['body']>, 
  res: Response
) {
  const body = req.body
  const product_id = req.params.product_id as string

  const product = await ProductService.findById(product_id)
  if (!product) {
    return res.status(404).json({ msg: 'Product not found.' })
  }
  
  await ProductService.editProduct({ _id: product_id }, { ...body })

  res.status(200).json({ msg: 'Product updated' })
}

const getSingleProductHandler = async (
  req: Request<ProductInput['params'], {}, {}>, 
  res: Response
) => {
  const product_id = req.params.product_id as string

  const product = await ProductService.findById(product_id)

  if (!product) {
    return res.status(404).json({ 
      msg: `Product with id ${product_id} not found.` 
    })
  }

  res.status(200).json(product)
}

async function getByCategory(
  req: Request<ProductParam, {}, {}>, 
  res: Response
) {
  const category = req.params.category as string

  // PAGINATION
  const page = parseInt(req.query.page as string) || 1
  const skip = (page - 1) * PRODUCT_LIMIT
  
  let query: any = {}

  // querying the category
  query['category'] = new RegExp(category, 'i')

  const products = await ProductService.getByFilter({ limit: PRODUCT_LIMIT, skip, query })

  const total = await ProductService.countByFilter(query)

  res.status(200).json({
    data: products,
    pagination: {
      page: page,
      total: total,
      pages: Math.ceil(total/PRODUCT_LIMIT),
    },
  })
}

export default {
  editProductHandler,
  getByCategory,
  getAllProductsHandler,
  createProductHandler,
  getSingleProductHandler,
}
