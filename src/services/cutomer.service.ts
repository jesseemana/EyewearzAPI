import CustomerModel, { Customer } from '../models/customer.model'

async function getAllCustomers () {
  return CustomerModel.find({})
}

async function registerCustomer (data: Partial<Customer>) {
  const new_user = await CustomerModel.create(data)
  return new_user
}

export default {
  registerCustomer,
  getAllCustomers
}
