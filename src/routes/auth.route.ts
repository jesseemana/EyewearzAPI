import { Router } from 'express'
import { limiter } from '../middleware'
import { login, logout } from '../controllers/auth.controller'

const router = Router()

router.post('/login', limiter, login)
router.post('/logout', logout)

export default router
