import { UserModel } from '../models';
import { omit } from 'lodash';
import { User } from '../models/user.model';

async function findUserById(id: string) {
  const user = UserModel.findById(id);
  return user;
}

async function registerUser(data: Partial<User>) {
  const new_user = await UserModel.create(data)
  return omit(new_user.toJSON(), 'password', 'confirm_password')
}

async function findByEmail(email: string) {
  const user = UserModel.findOne({ email: email });
  return user;
}

export default {
  registerUser,
  findByEmail,
  findUserById,
}
