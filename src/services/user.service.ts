import { omit } from 'lodash'
import { FilterQuery, UpdateQuery } from 'mongoose'
import UserModel, { IUser } from '../models/user.model'

async function FindAllUsers() {
  const users = await UserModel.find({})
  return users
}

async function FindUserById(id: string) {
  const user = await UserModel.findById(id)
  return user
}

async function FindByEmail(email: string) {
  const user = await UserModel.findOne({ email })
  return user
}

async function RegisterUser(data: Partial<IUser>) {
  const new_user = await UserModel.create(data)
  return omit(new_user.toJSON(), 'password')
}

async function UpdateUser(filter: FilterQuery<IUser>, update: UpdateQuery<IUser>) {
  const updated = await UserModel.findOneAndUpdate(filter, update)
  return updated
}

export default {
  RegisterUser,
  FindAllUsers,
  UpdateUser,
  FindByEmail,
  FindUserById,
}
