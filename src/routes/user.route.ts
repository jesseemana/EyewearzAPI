import { Router } from 'express'
import { validateInput, requireUser, requireAdmin } from '../middleware'
import { UserController } from '../controllers'
import { userSchema, updateUserSchema, resetSchema } from '../schema'

const router = Router()

router.route('/')
  .get(UserController.getAllUsers)
  .post(validateInput(userSchema), UserController.createUserHandler)

router.get('/me', requireUser, UserController.getCurrentUserHandler)

router.patch(
  '/update', 
  [requireUser, validateInput(updateUserSchema)], 
  UserController.updateUserHandler
)

router.patch(
  '/admin', 
  [requireAdmin, validateInput(updateUserSchema)], 
  UserController.manageAdmin
)

export default router;
