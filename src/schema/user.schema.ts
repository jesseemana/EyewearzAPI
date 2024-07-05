import { string, z, TypeOf } from 'zod'

export const userSchema = z.object({
  body: z.object({
    first_name: string({
      required_error: 'First name is required'
    }).trim(),
    last_name: string({
      required_error: 'Last name is required'
    }).trim(),
    email: string({
      required_error: 'Provide an email address'
    })
      .email('Enter a valid email')
      .toLowerCase()
      .trim(),
    location: string({
      required_error: 'Location is required'
    }).trim(),
    admin: z.boolean().optional(),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, "Must not be less than 8 characters.")
      .max(24, "Cannot be more than 24 characters long."),
    confirm_password: string({
      required_error: 'Password confirmation is required',
    })
      .min(8, "Must not be less than 8 characters.")
      .max(24, "Cannot be more than 24 characters long."),
  }).refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })
})

export const updateUserSchema = z.object({
  params: z.object({
    user_id: string({ 
      required_error: 'Provide a user id' 
    }),
  }),
  body: z.object({
    first_name: string({
      required_error: 'First name is required'
    })
      .trim()
      .optional(),
    last_name: string({
      required_error: 'Last name is required'
    })
      .trim()
      .optional(),
    location: string({
      required_error: 'Location is required'
    })
      .trim()
      .optional(),
    role: z.enum(['admin', 'user']).optional(),
    email: string()
      .email('Enter a valid email')
      .toLowerCase()
      .trim()
      .optional()
  })
})

export const loginSchema = z.object({
  body: z.object({
    email: string({ 
      required_error: 'Email is required' 
    })
      .email('Enter a valid email')
      .trim()
      .toLowerCase(),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, "Must not be less than 8 characters.")
      .max(24, "Cannot be more than 24 characters long."),
  })
})

export const emailSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required'
    }).email('Provide a valid email')
  })
})

export const resetSchema = z.object({
  params: z.object({
    user_id: string({ 
      required_error: 'User id is required' 
    }).trim(),
    reset_code: string({ 
      required_error: 'Password reset code is required' 
    }).trim(),
  }),
  body: z.object({
    password: string({
      required_error: 'Please provide a password'
    })
      .min(8, "Must not be less than 8 characters.")
      .max(24, "Cannot be more than 24 characters long."),
    confirm_password: string({
      required_error: 'Please confirm your password'
    })
      .min(8, "Must not be less than 8 characters.")
      .max(24, "Cannot be more than 24 characters long."),
  }).refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  }),
})

export type EmailType = TypeOf<typeof emailSchema>['body']
export type UserInput = TypeOf<typeof userSchema>['body']
export type LoginInput = TypeOf<typeof loginSchema>['body']
export type ResetInput = TypeOf<typeof resetSchema>
export type UpdateUserInput = TypeOf<typeof updateUserSchema>
