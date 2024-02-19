import { string, object, TypeOf, z } from 'zod'

/**
 * @openapi
 * components:
 *  schema:
 *    getAllUsers:
 *      type: array
 *      items:
 *        type: object
 *        required:
 *          - first_name
 *          - last_name
 *          - email
 *          - role
 *          - cart
 *          - favorites
 *        properties:
 *          _id:
 *            type: string
 *          first_name:
 *            type: string
 *          last_name:
 *            type: string
 *          email:
 *            type: string
 *          role:
 *            type: string
 *          cart:
 *            type: array
 *            items:
 *              type: string
 *          favorites:
 *            type: array
 *            items:
 *              type: string
 *          __v:
 *            type: number
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - first_name
 *        - last_name
 *        - email
 *        - role
 *        - password
 *      properties:
 *        first_name:
 *          type: string
 *          default: John
 *        last_name:
 *          type: string
 *          default: Doe
 *        email:
 *          type: string
 *          default: johndoe@example.com
 *        role:
 *          type: string
 *          default: admin
 *        password:
 *          type: string
 *          default: Password_1234
 *        confirm_password:
 *          type: string
 *          default: Password_1234
 *    userResponse:
 *      type: object
 *      properties:
 *         _id:
 *          type: string
 *         first_name:
 *          type: string
 *         last_name:
 *          type: string
 *         email:
 *          type: string
 *         role:
 *          type: string
 *         __v:
 *          type: number
 */
export const user_schema = object({
  first_name: string({
    required_error: 'First name is required'
  }).trim(),
  last_name: string({
    required_error: 'Last name is required'
  }).trim(),
  email: string({
    required_error: 'Provide an email address'
  }).email('Enter a valid email').toLowerCase().trim(),
  role: z.enum(['admin', 'user']),
  password: string({
    required_error: 'Password is required',
  }).regex(new RegExp(".*[A-Z].*"), "One uppercase character").regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),"One special character")
    .min(8, "Must not be less than 8 characters.")
    .max(64, "Cannot be more than 64 characters long."),
  confirm_password: string({
    required_error: 'Password confirmation is required',
  }).regex(new RegExp(".*[A-Z].*"), "One uppercase character").regex(new RegExp(".*\\d.*"), "One number")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),"One special character")
    .min(8, "Must not be less than 8 characters.")
    .max(64, "Cannot be more than 64 characters long."),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})


/**
 * @openapi
 * components:
 *  schema:
 *    loginUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: johndoe@example.com
 *        password:
 *          type: string
 *          default: Password_1234
 *    loginUserResponse:
 *      type: object
 *      required:
 *        - accessToken
 *      properties:
 *        accessToken:
 *          type: string 
 */
export const login_schema = object({
  email: string({ required_error: 'Email is required' }).email('Enter a valid email').trim().toLowerCase(),
  password: string({
    required_error: 'Password is required',
  }).regex(new RegExp(".*[A-Z].*"), "One uppercase character").regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),"One special character")
    .min(8, "Must not be less than 8 characters.")
    .max(64, "Cannot be more than 64 characters long."),
})


export const reset_schema = object({
  params: object({
    id: string({ required_error: 'Id is required' }).trim(),
    password_reset_code: string({ required_error: 'Password reset code is required' }).trim(),
  }),
  body: object({
    password: string({
      required_error: 'Please provide a password'
    }).regex(new RegExp(".*[A-Z].*"), "One uppercase character").regex(new RegExp(".*\\d.*"), "One number")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),"One special character")
      .min(8, "Must not be less than 8 characters.")
      .max(64, "Cannot be more than 64 characters long."),
    confirm_password: string({
      required_error: 'Please confirm your password'
    }).regex(new RegExp(".*[A-Z].*"), "One uppercase character").regex(new RegExp(".*\\d.*"), "One number")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),"One special character")
      .min(8, "Must not be less than 8 characters.")
      .max(64, "Cannot be more than 64 characters long."),
  }).refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  }),
})

export type UserInput = TypeOf<typeof user_schema>
export type LoginInput = TypeOf<typeof login_schema>
export type ResetInput = TypeOf<typeof reset_schema>
