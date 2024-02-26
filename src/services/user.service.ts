import { UserModel } from '../models'
import { omit } from 'lodash'
import { User } from '../models/user.model'
import { DocumentType } from '@typegoose/typegoose'
import { generate_code } from '../utils'

const get_all_users = async () => {
  return UserModel.find({})
}

const register_user = async (data: Partial<User>) => {
  const new_user = await UserModel.create(data)
  return omit(new_user.toJSON(), 'password', 'confirm_password')
}

const find_user_by_email = async (email: string) => {
  return UserModel.findOne({ email })
}

const find_user_by_id = async (id: string) => {
  return UserModel.findById(id)
}

const update_reset_code = async (user: DocumentType<User>) => {
  const password_reset_code = generate_code()
  user.password_reset_code = password_reset_code
  user.save()
  return user.password_reset_code
}

const update_password = async (user: DocumentType<User>, password_reset_code: string, password: string) => {
  if (user.password_reset_code === password_reset_code) {
    user.password = password
    user.password_reset_code = null
    user.save()
    return true
  }
  return false
}

export default {
  register_user,
  get_all_users,
  find_user_by_id,
  update_reset_code,
  find_user_by_email,
  update_password,
}
