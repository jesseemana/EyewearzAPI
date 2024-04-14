import { 
  pre, 
  prop, 
  index,
  Severity, 
  DocumentType, 
  modelOptions, 
  getModelForClass, 
} from '@typegoose/typegoose';
import argon2 from 'argon2';
import { log } from '../utils';

@pre<User>('save', async function() {
  if (this.isModified('password')) { 
    const hash = await argon2.hash(this.password);
    this.password = hash;
    return;
  }
  return;
})

@index({ email: 1})

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW
  }
})

export class User {
  @prop({ required: true })
  first_name: string;

  @prop({ required: true })
  last_name: string;

  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  location: string;
  
  @prop({ required: true, default: 'user' })
  role: string;

  @prop()
  password_reset_code: string | null;

  async verifyPassword(this: DocumentType<User>, candidate_password: string) {
    try {
      return await argon2.verify(this.password, candidate_password);
    } catch(err) {
      log.error(err, 'Failed to validate password');
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
