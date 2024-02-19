import { Router } from 'express'
import { UserController } from '../controllers'
import { require_admin, validate_input } from '../middleware'

const router = Router()

/**
 * @openapi
 * '/api/v1/user':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get all users/customers
 *     responses:
 *        200:
 *          description: Get all users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schema/getAllUsers'
 *        401:
 *          description: Unauthorized
 *        403:
 *          description: Forbiden
 *        404:
 *          description: No users found
 *  post:
 *      tags:
 *      - Users
 *      summary: Register a user/customer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schema/CreateUserInput'
 *      responses:
 *        201:
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schema/userResponse'
 *              example:
 *                "_id": "642a1cfcc1bec76d8a2e7ac2"
 *                "first_name": "John"
 *                "last_name": "Doe"
 *                "email": "johndoe@example.com"
 *                "role": "admin"
 *                "__v": 0
 *        409:
 *          description: Conflict
 *        400:
 *          description: Bad request
 *        500:
 *          description: Internal server error
 */
router.route('/')
  .get(require_admin, UserController.get_users_handler)
  .post(validate_input, UserController.create_user_handler)

router.route('/forgot-password').post(validate_input, UserController.forgot_password_handler)

router.route('/reset/:id/:password_reset_code').post(validate_input, UserController.reset_password_handler)

export default router
