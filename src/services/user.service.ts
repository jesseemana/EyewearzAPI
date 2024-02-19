import { UserModel } from '../models'
import { omit } from 'lodash'
import { User } from '../models/user.model'

const getAllUsers = () => {
  return UserModel.find({})
}

const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email })
}

const findUserById = async (id: string) => {
  return UserModel.findById(id)
}

const registerUser = async (data: Partial<User>) => {
  const new_user = await UserModel.create(data)
  return omit(new_user.toJSON(), 'password', 'confirm_password')
}

export default {
  registerUser,
  getAllUsers,
  findUserById,
  findUserByEmail,
}
