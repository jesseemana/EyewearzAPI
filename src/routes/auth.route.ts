import { Router } from 'express'
import { AuthController } from '../controllers'
import { limiter, require_user } from '../middleware'

const router = Router()

/**
 * @openapi
 *'/api/auth/login':
 *  post:
 *      tags: 
 *      - Auth
 *      summary: Login user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schema/loginUserInput'
 *      responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schema/loginUserResponse'
 *        404:
 *          description: Invalid email/user not found
 *        401:
 *          description: Invalid password
 */
router.post('/login', limiter, AuthController.login)

/**
 * @openapi
 * '/api/auth/logout':
 *  delete:
 *        tags:
 *        - Auth
 *        summary: Logout user
 *        responses:
 *          200:
 *              description: User loged out
 *          403:
 *              description: Forbidden
 */
router.delete('/logout', require_user, AuthController.logout)

export default router
