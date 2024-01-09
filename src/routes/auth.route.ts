import { Router } from 'express'
import { limiter, require_user } from '../middleware'
import { login, logout } from '../controllers/auth.controller'

const router = Router()

/**
 * @openapi
 *'/api/auth/login'
 *  post:
 *    tags: 
 *      - Auth
 *    summary: Login user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json
 *          schema:
 *            $ref: '#/components/schemas/login_user_input'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/login_user_response'
 */
router.post('/login', limiter, login)

/**
 * @openapi
 * '/api/auth/logout'
 *  delete:
 *    tags:
 *      - Auth
 *    summary: Delete a session
 *    responses:
 *      200:
 *        description: User loged out
 *      403:
 *        description: Forbidden
 */
router.delete('/logout', require_user, logout)

export default router
