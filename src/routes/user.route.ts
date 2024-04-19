import { Router } from 'express';
import { validateInput, requireUser, requireAdmin } from '../middleware';
import { UserController } from '../controllers';

const router = Router();

router.post('/', validateInput, UserController.createUserHandler);

router.get('/me', requireUser, UserController.getCurrentUserHandler);

router.patch('/update', requireUser, UserController.updateUserHandler);

router.patch('/admin', requireAdmin, UserController.createAdmin);

router.post('/forgot-password', validateInput, UserController.forgotPasswordHandler);

router.post('/:id/reset/:reset_code', validateInput, UserController.resetPasswordHandler);

export default router;
