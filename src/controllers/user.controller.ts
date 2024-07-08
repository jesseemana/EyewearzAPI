import { Request, Response } from 'express'
import { UpdateUserInput, UserInput } from '../schema/user.schema'
import { userService } from '../services'

async function getAllUsers(_req: Request, res: Response) {
  const users = await userService.FindAllUsers()
  res.status(200).json(users)
}

async function getCurrentUserHandler(req: Request, res: Response) {
  const user = req.user
  res.status(200).json(user)
}

async function createUserHandler(
  req: Request<{}, {}, UserInput>, 
  res: Response
) {
  const data = req.body
  const user = await userService.RegisterUser(data)
  res.status(201).json({ 
    msg: `New user ${user.first_name} ${user.last_name} has been created.` 
  })
}

async function updateUserHandler(
  req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>, 
  res: Response
) {
  const { user_id } = req.params

  const user = await userService.FindUserById(user_id)
  if (!user) return res.status(404).json({ msg: 'User not found!' })

  await userService.UpdateUser({ _id: user_id }, { ...req.body })

  res.status(200).json({ msg: 'User updated' })
}

export default {
  updateUserHandler,
  createUserHandler,
  getAllUsers, 
  getCurrentUserHandler, 
}
