import { Router } from 'express'
import { createCustomer, getAllCustomers } from '../controllers/cutomer.controller'

const router = Router()

router.get('/', getAllCustomers)
router.post('/create', createCustomer)

export default router
