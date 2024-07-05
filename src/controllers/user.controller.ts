import { Request, Response } from 'express'
import { UpdateUserInput, UserInput } from '../schema/user.schema'
import { UserService } from '../services'

async function getAllUsers(_req: Request, res: Response) {
  const users = await UserService.findAllUsers()
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
  const user = await UserService.registerUser(data)
  res.status(201).json({ 
    msg: `New user ${user.first_name} ${user.last_name} has been created.` 
  })
}

async function updateUserHandler(
  req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>, 
  res: Response
) {
  const { user_id } = req.params
  const body = req.body

  const user = await UserService.findUserById(user_id)
  if (!user) return res.status(404).json({ msg: 'User not found!' })

  await UserService.updateUser({ _id: user_id }, { ...body })

  res.status(200).json({ msg: 'User updated' })
}

export default {
  updateUserHandler,
  createUserHandler,
  getAllUsers, 
  getCurrentUserHandler, 
}
