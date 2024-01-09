import { Router } from 'express'
import { 
  createCustomer, 
  getAllCustomers,
} from '../controllers/cutomer.controller'

const router = Router()

router.route('/')
  .get(getAllCustomers)
  .post(createCustomer)

export default router
