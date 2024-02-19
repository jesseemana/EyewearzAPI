import { Request, RequestHandler, Response } from 'express'
import { LoginInput, ResetInput, UserInput } from '../schema/user'
import { UserService }from '../services'
import { log } from '../utils'
import { generate_code } from '../utils/generatecode'

const BASE_URL = 'http://localhost:3030/api/v1/user'

const get_users_handler: RequestHandler = async (_req: Request, res: Response) => {
  try {
    const all_users = await UserService.getAllUsers()
    return res.status(200).send(all_users)
  } catch(error) {
    return res.status(500).send('Internal Server Error')
  }
}

const create_user_handler: RequestHandler = async (
  req: Request<{}, {}, UserInput>, 
  res: Response
) => {
  try {
    const data = req.body
    const new_user = await UserService.registerUser(data)
    return res.status(201).send(`New user ${new_user.first_name} ${new_user.last_name} has been registered.`)
  } catch (error: any) {
    if (error.code === 11000) 
      return res.send('Account already exists')
    return res.status(500).send('Internal Server Error')
  }
}

const forgot_password_handler: RequestHandler = async (
  req: Request<{}, {}, LoginInput>, 
  res: Response
) => {
  try {
    const { email } = req.body

    const user = await UserService.findUserByEmail(email)
    if (!user) return res.status(404).send('User not found')

    const password_reset_code = generate_code()
    user.password_reset_code = password_reset_code
    user.save()

    // send reset email link to user here
    const link = `${BASE_URL}/reset/${user._id}/${user.password_reset_code}`
    log.info(`Password reset link: ${link}`)

    return res.status(200).send('Email reset link sent to user')
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
}

const reset_password_handler = async (
  req: Request<ResetInput['params'], {}, ResetInput['body']>, 
  res: Response
) => {
  try {
    const { id, password_reset_code } = req.params
    const { password } = req.body

    const user = await UserService.findUserById(id)
    if (!user) return res.status(404).send('User not found')

    if (user.password_reset_code === password_reset_code) {
      user.password = password
      user.password_reset_code = null
      user.save()
      return res.status(200).send(`Users' password has been updated`)
    }

    return res.status(400).send(`Failed to update users' password`)
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
}

export default {
  get_users_handler, 
  create_user_handler, 
  forgot_password_handler, 
  reset_password_handler,
}
