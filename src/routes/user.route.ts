import { Router } from 'express';
import { validateInput, requireUser } from '../middleware';
import { UserController } from '../controllers';

const router = Router();

router.route('/').post(validateInput, UserController.createUserHandler);

router.route('/me').get(requireUser, UserController.getCurrentUserHandler);

router.route('/forgot-password').post(validateInput, UserController.forgotPasswordHandler);

router.route('/:id/reset/:reset_code').post(validateInput, UserController.resetPasswordHandler);

export default router;
