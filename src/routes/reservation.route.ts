import { Router } from 'express';
import { BookingController } from '../controllers';
import { requireAdmin, requireUser, validateInput } from '../middleware';

const router = Router();

router.post('/', requireAdmin, BookingController.getAppointmentsHandler);

router.post('/create', [requireUser, validateInput], BookingController.createAppointmentHandler);

export default router;
