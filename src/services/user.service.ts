import { UserModel } from '../models'
import { omit } from 'lodash'
import { User } from '../models/user.model'
import { FilterQuery, UpdateQuery } from 'mongoose'

async function findAllUsers() {
  const users = UserModel.find({})
  return users
}

async function findUserById(id: string) {
  const user = UserModel.findById(id)
  return user
}

async function findByEmail(email: string) {
  const user = UserModel.findOne({ email })
  return user
}

async function registerUser(data: Partial<User>) {
  const new_user = await UserModel.create(data)
  return omit(new_user.toJSON(), 'password')
}

async function updateUser(filter: FilterQuery<User>, update: UpdateQuery<User>) {
  const updated = await UserModel.findOneAndUpdate(filter, update)
  return updated
}

async function manageAdmin(filter: FilterQuery<User>, update: UpdateQuery<User>) {
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
