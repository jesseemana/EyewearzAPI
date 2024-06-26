import { string, object, TypeOf, z } from 'zod';


export const userSchema = object({
  first_name: string({
    required_error: 'First name is required'
  }).trim(),
  last_name: string({
    required_error: 'Last name is required'
  }).trim(),
  email: string({
    required_error: 'Provide an email address'
  }).email('Enter a valid email').toLowerCase().trim(),
  location: string({
    required_error: 'Location is required'
  }).trim(),
  role: z.enum(['admin', 'user']),
  password: string({
    required_error: 'Password is required',
  }).min(8, "Must not be less than 8 characters.").max(24, "Cannot be more than 24 characters long."),
  confirm_password: string({
    required_error: 'Password confirmation is required',
  }).min(8, "Must not be less than 8 characters.").max(24, "Cannot be more than 24 characters long."),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});


export const updateUserSchema = object({
  params: object({
    user_id: string({ 
      required_error: 'Provide a user id' 
    }),
  }),
  body: object({
    first_name: string({
      required_error: 'First name is required'
    }).trim(),
    last_name: string({
      required_error: 'Last name is required'
    }).trim(),
    location: string({
      required_error: 'Location is required'
    }).trim(),
    role: z.enum(['admin', 'user']),
    email: string().email('Enter a valid email')
      .toLowerCase()
      .trim()
  })
})


export const loginSchema = object({
  email: string({ required_error: 'Email is required' }).email('Enter a valid email').trim().toLowerCase(),
  password: string({
    required_error: 'Password is required',
  }).min(8, "Must not be less than 8 characters.").max(24, "Cannot be more than 24 characters long."),
});


export const resetSchema = object({
  params: object({
    id: string({ 
      required_error: 'Id is required' 
    }).trim(),
    reset_code: string({ 
      required_error: 'Password reset code is required' 
    }).trim(),
  }),
  body: object({
    email: string({ 
      required_error: 'Email is required', 
    }).email('Enter a valid email').trim().toLowerCase(),
    password: string({
      required_error: 'Please provide a password'
    }).min(8, "Must not be less than 8 characters.")
      .max(24, "Cannot be more than 24 characters long."),
    confirm_password: string({
      required_error: 'Please confirm your password'
    }).min(8, "Must not be less than 8 characters.")
      .max(24, "Cannot be more than 24 characters long."),
  }).refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  }),
});

export type UserInput = TypeOf<typeof userSchema>;
export type LoginInput = TypeOf<typeof loginSchema>;
export type ResetInput = TypeOf<typeof resetSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
