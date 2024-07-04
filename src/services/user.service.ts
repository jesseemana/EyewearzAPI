import { omit } from 'lodash'
import UserModel, { IUser } from '../models/user.model'
import { FilterQuery, UpdateQuery } from 'mongoose'

async function findAllUsers() {
  const users = await UserModel.find({})
  return users
}

async function findUserById(id: string) {
  const user = await UserModel.findById(id)
  return user
}

async function findByEmail(email: string) {
  const user = await UserModel.findOne({ email })
  return user
}

async function registerUser(data: Partial<IUser>) {
  const new_user = await UserModel.create(data)
  return omit(new_user.toJSON(), 'password')
}

async function updateUser(filter: FilterQuery<IUser>, update: UpdateQuery<IUser>) {
  const updated = await UserModel.findOneAndUpdate(filter, update)
  return updated
}

async function manageAdmin(filter: FilterQuery<IUser>, update: UpdateQuery<IUser>) {
  const updated = await UserModel.findOneAndUpdate(filter, update)
  return updated
}

export default {
  registerUser,
  manageAdmin,
  findAllUsers,
  updateUser,
  findByEmail,
  findUserById,
}
