import { Router } from 'express'
import { AuthController } from '../controllers'
import { limiter, requireUser, validateInput } from '../middleware'
import { loginSchema, resetSchema } from '../schema'
import { emailSchema } from '../schema/user.schema'

const router = Router()

router.post(
  '/login', 
  [limiter, validateInput(loginSchema)], 
  AuthController.loginHandler
)

router.post(
  '/forgot-password', 
  validateInput(emailSchema), 
  AuthController.forgotPasswordHandler
)

router.post(
  '/:user_id/reset/:reset_code', 
  validateInput(resetSchema), 
  AuthController.resetPasswordHandler
)

router.delete('/logout', requireUser, AuthController.logoutHandler)

export default router
