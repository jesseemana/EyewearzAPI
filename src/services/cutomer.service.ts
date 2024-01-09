import { CustomerModel } from '../models'
import { omit } from 'lodash'
import { Customer } from '../models/customer.model'

const getAllCustomers = () => {
  return CustomerModel.find({})
}

const registerCustomer = async (data: Partial<Customer>) => {
  const new_user = await CustomerModel.create(data)
  return omit(new_user.toJSON(), 'password', 'verifyPassword')
}

export default {
  registerCustomer,
  getAllCustomers
}
