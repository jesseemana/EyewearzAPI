import { Router } from 'express';
import { UserController } from '../controllers';
import { validate_input } from '../middleware';
import requireUser from '../middleware/require-user';

const router = Router();

router.route('/').post(validate_input, UserController.createUserHandler);

router.route('/me').get(requireUser, UserController.getCurrentUser);

router.route('/forgot-password').post(validate_input, UserController.forgotPasswordHandler);

router.route('/:id/reset/:reset_code').post(validate_input, UserController.resetPasswordHandler);

export default router;
