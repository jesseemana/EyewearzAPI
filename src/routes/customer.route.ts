import { Router } from 'express'
import { createCustomer, getAllCustomers } from '../controllers/cutomer.controller'

const router = Router()

router.post('/', getAllCustomers)
router.post('/create', createCustomer)

export default router
