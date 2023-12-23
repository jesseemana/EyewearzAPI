import { Router } from 'express'
import { bookAppointment, getAppointments } from '../controllers/reservation.controller'

const router = Router()

router.post('/', getAppointments)
router.post('/book', bookAppointment)

export default router
