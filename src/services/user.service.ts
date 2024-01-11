import { CustomerModel } from '../models'
import { omit } from 'lodash'
import { Customer } from '../models/user.model'

const getAllUsers = () => {
  return CustomerModel.find({})
}

const registerUser = async (data: Partial<Customer>) => {
  const new_user = await CustomerModel.create(data)
  return omit(new_user.toJSON(), 'password', 'verifyPassword')
}

export default {
  registerUser,
  getAllUsers
}
