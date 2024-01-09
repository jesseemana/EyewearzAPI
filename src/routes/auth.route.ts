import { Router } from 'express'
import { limiter, require_user } from '../middleware'
import { login, logout } from '../controllers/auth.controller'

const router = Router()

router.post('/login', limiter, login)
router.delete('/logout', require_user, logout)

export default router
