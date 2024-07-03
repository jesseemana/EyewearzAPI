import { Router } from 'express'
import { AuthController } from '../controllers'
import { limiter, requireUser, validateInput } from '../middleware'
import { loginSchema } from '../schema'

const router = Router()

router.get('/sessions', AuthController.getSessions)
router.post('/login', [limiter, validateInput(loginSchema)], AuthController.loginHandler)
router.delete('/logout', requireUser, AuthController.logoutHandler)

export default router
