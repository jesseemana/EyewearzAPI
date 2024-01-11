import { Request, Response } from 'express'
import { user_schema } from '../schema'
import { UserInput } from '../schema/user'
import { CustomerService }from '../services'

export async function getAllUsers (_: Request, res: Response) {
  try {
    const user = res.locals.user
    if (user.role !== 'admin') return res.sendStatus(401)
    
    const all_users = await CustomerService.getAllUsers()

    return res.status(200).send(all_users)
  } catch(error) {
    return res.status(500).send('Internal server error!')
  }
}

export async function createUser (
  req: Request<{}, {}, UserInput>, 
  res: Response
) {
  const data = user_schema.parse(req.body)
  try {
    const new_user = await CustomerService.registerUser(data)
    return res.status(201).send(`New user ${new_user.first_name} ${new_user.last_name} has been created.`)
  } catch (error: any) {
    if (error.code === 11000) return res.send('Account already exists')
    return res.status(500).send('Internal server error!')
  }
}
