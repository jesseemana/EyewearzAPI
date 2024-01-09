import { string, object, TypeOf } from 'zod'

/**
 * @openapi
 * components:
 *  schemas:
 *    create_user_input:
 *      type: object
 *      required:
 *        - first_name
 *        - last_name
 *        - email
 *        - password
 *        - confirm_password
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
 *        password:
 *          type: string
 *          default: Password_1234
 *        confirm_password:
 *          type: string
 *          default: Password_1234
 *    create_user_response:
 *      type: object
 *      properties:
 *        first_name:
 *          type: string
 *        last_name
 *          type: strinig
 *        email
 *          type: string
 *        role:
 *          type: string
 *        cart:
 *          type: array
 *        favorites:
 *          type: array
 *        _id:
 *          type: string
 *    login_user_input
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *         email:
 *          type: string
 *          default: johndoe@example.com
 *        password:
 *          type: string
 *          default: Password_1234
 *    login_user_response:
 *      type: object
 *      properties:
 *        required:
 *         - accessToken
 *       properties:
 *         accessToken:
 *           type: string
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
