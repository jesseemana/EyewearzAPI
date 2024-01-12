import { Router } from 'express'
import { BookingController } from '../controllers'

const router = Router()

router.post('/', BookingController.getAppointments)
router.post('/book', BookingController.bookAppointment)

export default router
