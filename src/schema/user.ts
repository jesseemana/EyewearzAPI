import { string, object, TypeOf } from 'zod'

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

export type UserInput = TypeOf<typeof user_schema>
export type LoginInput = TypeOf<typeof login_schema>
