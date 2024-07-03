import { Request, Response } from 'express'
import { uploadPicture, log } from '../utils'
import { ProductInput } from '../schema/product.schema'
import { ProductService } from '../services'

const PRODUCT_LIMIT = parseInt(process.env.PRODUCT_LIMIT as string)

const getAllProductsHandler = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1
  const skip = (page - 1) * PRODUCT_LIMIT
  const total = await ProductService.countTotalProducts()

  const products = await ProductService.getAllProducts(PRODUCT_LIMIT, skip)

  res.status(200).send({
    products: products,
    pagination: {
      page: page,
      total_pages: Math.ceil(total/PRODUCT_LIMIT),
    }
  })
}


async function createProductHandler(
  req: Request<{}, {}, ProductInput['body']>, 
  res: Response
) {
  const body = req.body
  const file = req.file
  if (file) {
    const upload_response = await uploadPicture(file)
    const product = await ProductService.createProduct({ 
      ...body, 
      ...upload_response 
    })
    return res.status(201).json(product)
  }
  res.status(400).send('Please provide a picture for the product.')
}


async function editProductHandler(
  req: Request<ProductInput['params'], {}, ProductInput['body']>, 
  res: Response
) {
  const body = req.body
  const { product_id } = req.params

  const product = await ProductService.findProduct(product_id)
  if (!product) {
    return res.status(404).send('Product not found.')
  }
  await ProductService.editProduct({ product_id: product_id }, { ...body })
  res.status(200).json({ msg: 'Product updated' })
}


const getSingleProductHandler = async (
  req: Request<ProductInput['params'], {}, {}>, 
  res: Response
) => {
  const { product_id } = req.params
  const product = await ProductService.findProduct(product_id)
  if (!product) {
    return res.status(404).json({ msg: `Product with product id ${product_id} not found.` })
  }
  res.status(200).send(product)
}


async function getSunGlassesHandler(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1
  const skip = (page - 1) * PRODUCT_LIMIT
  const total = await ProductService.countByFilter('sunglasses')

  const sunglasses = await ProductService.getByFilter({ 
    skip, 
    limit: PRODUCT_LIMIT, 
    filter: 'sunglasses' 
  })

  res.status(200).send({
    results: sunglasses,
    pagination: {
      page: page,
      total_pages: Math.ceil(total / PRODUCT_LIMIT),
    }
  })
}


async function getEyeGlassesHandler(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1
  const skip = (page - 1) * PRODUCT_LIMIT
  const total = await ProductService.countByFilter('eyeglasses')

  const eyeglasses = await ProductService.getByFilter({
    skip,
    limit: PRODUCT_LIMIT, 
    filter: 'eyeglasses'
  })

  res.status(200).send({
    results: eyeglasses,
    pagination: {
      page: page,
      total_pages: Math.ceil(total / PRODUCT_LIMIT),
    }
  })
}


async function getFeaturedProductsHandler(req: Request, res: Response) {
  const limit = 6
  const page = parseInt(req.query.page as string) || 1
  const skip = (page - 1) * limit
  const total = await ProductService.countByFilter('featured')

  const products = await ProductService.getFeaturedProducts(limit, skip)

  res.status(200).send({
    results: products,
    pagination: {
      page: page,
      total_pages: Math.ceil(total / limit),
    }
  })
}


async function searchProductsHandler(req: Request, res: Response) {
  // setup product searching here
}


export default {
  searchProductsHandler,
  editProductHandler,
  getSunGlassesHandler,
  getFeaturedProductsHandler,
  getEyeGlassesHandler,
  getAllProductsHandler,
  createProductHandler,
  getSingleProductHandler,
}
