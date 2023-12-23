import { Router } from 'express'
import { login, logout } from '../controllers/auth.controller'
import loginLimiter from '../middleware/limiter'

const router = Router()

router.post('/login', loginLimiter, login)
router.post('/logout', logout)

export default router
