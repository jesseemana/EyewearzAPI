import { Router } from 'express'
import { validateInput, requireUser, requireAdmin } from '../middleware'
import { UserController } from '../controllers'
import { userSchema, updateUserSchema, resetSchema } from '../schema'

const router = Router()

router.get('/me', requireUser, UserController.getCurrentUserHandler)

router.route('/')
  .get(requireAdmin, UserController.getAllUsers)
  .post(validateInput(userSchema), UserController.createUserHandler)

router.patch(
  '/:user_id/update', 
  [requireAdmin, validateInput(updateUserSchema)], 
  UserController.updateUserHandler
)

export default router;
