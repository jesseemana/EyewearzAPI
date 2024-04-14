import { Router } from 'express';
import { AuthController } from '../controllers';
import { limiter, requireUser, validateInput } from '../middleware';

const router = Router();

router.post('/login', validateInput, limiter, AuthController.loginHandler);

router.delete('/logout', requireUser, AuthController.logoutHandler);

export default router;
