import { Request, Response } from 'express'
import { UserInput, user_schema } from '../schema/user'
import CustomerService from '../services/cutomer.service'

export async function getAllCustomers (_: Request, res: Response) {
  try {
    const all_users = await CustomerService.getAllCustomers()
    res.status(200).send(all_users)
  } catch(error) {
    return res.status(500).send('Internal server error!')
  }
}

export async function createCustomer (
  req: Request<{}, {}, UserInput>, 
  res: Response
) {
  const data = user_schema.parse(req.body)
  try {
    const new_user = await CustomerService.registerCustomer(data)
    res.status(201).send(`New user ${new_user.first_name} ${new_user.last_name} has been created.`)
  } catch (error: any) {
    if (error.code === 11000) 
      return res.send('Account already exists')
    return res.status(500).send('Internal server error!')
  }
}
