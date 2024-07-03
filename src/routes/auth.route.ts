import { Router } from 'express'
import { AuthController } from '../controllers'
import { limiter, requireUser, validateInput } from '../middleware'
import { loginSchema, resetSchema } from '../schema'

const router = Router()

router.post(
  '/login', 
  [limiter, validateInput(loginSchema)], 
  AuthController.loginHandler
)

router.post(
  '/forgot-password', 
  validateInput(resetSchema), 
  AuthController.forgotPasswordHandler
)
  
router.post(
  '/:id/reset/:reset_code', 
  validateInput(resetSchema), 
  AuthController.resetPasswordHandler
)
router.get('/sessions', AuthController.getSessions)
router.delete('/logout', requireUser, AuthController.logoutHandler)

export default router
