import { Router } from 'express'
import { 
  createCustomer, 
  getAllCustomers,
} from '../controllers/cutomer.controller'

const router = Router()

/**
 * @openapi
 * '/api/users':
 *  post:
 *      tags:
 *      - Users
 *      summary: Resgister a user/customer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *      responses:
 *        201:
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CreateUserResponse'
 *        409:
 *          description: Conflict
 *        400:
 *          description: Bad request
 *        500:
 *          description: Internal server error
 *  get:
 *     tags:
 *     - Users
 *     summary: Get all users/customers
 *     responses:
 *        200:
 *          description: Get all users
 *        404:
 *          description: No users found
 */
router.route('/')
  .get(getAllCustomers)
  .post(createCustomer)

export default router
