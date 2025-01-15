import { Router } from 'express'
import {
    createUserController,
    deleteUserController,
    getAllUserController,
    getByIdUserController,
    getBySearchUserController,
    updateUserController,
} from '../controllers/index.js'
import { userSchema } from '../validations/index.js'
import { authGuard, checkValidatons, roleGuard } from '../middlewares/index.js'
import { config } from '../configs/index.js'

export const usersRouter = new Router()
const secret = config.token.access.secret

usersRouter.post(
    '/',
    authGuard(secret),
    roleGuard(['admin', 'superAdmin']),
    checkValidatons(userSchema),
    createUserController,
)
usersRouter.get('/', authGuard(secret), getAllUserController)
usersRouter.get('/search', getBySearchUserController)
usersRouter.get('/:id', authGuard(secret), getByIdUserController)
usersRouter.put(
    '/:id',
    authGuard(secret),
    roleGuard(['admin', 'superAdmin']),
    updateUserController,
)
usersRouter.delete(
    '/:id',
    authGuard(secret),
    roleGuard(['admin', 'superAdmin']),
    deleteUserController,
)
