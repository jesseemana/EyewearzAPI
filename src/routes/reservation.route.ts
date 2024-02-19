import { Router } from 'express'
import { BookingController } from '../controllers'
import { require_admin, require_user } from '../middleware'

const router = Router()

router.post('/', require_admin, BookingController.getAppointmentsHandler)
router.post('/create', require_user, BookingController.createAppointmentHandler)

export default router
