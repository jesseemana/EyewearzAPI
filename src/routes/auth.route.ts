import { Router } from 'express'
import { login, logout } from '../controller/auth.controller'
import loginLimiter from '../middleware/limiter'

const router = Router()

router.post('/login', loginLimiter, login)
router.post('/logout', logout)

export default router
