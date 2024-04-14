import { Router } from 'express';
import { AuthController } from '../controllers';
import { limiter, requireUser, validateInput } from '../middleware';

const router = Router();

router.get('/sessions', validateInput, AuthController.getSessions);

router.post('/login', [validateInput, limiter], AuthController.loginHandler);

router.delete('/logout', requireUser, AuthController.logoutHandler);

export default router;
