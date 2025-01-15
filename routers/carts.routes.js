import { Router } from 'express'
import {
    createCartController,
    deleteCartController,
    getAllCartController,
    getByIdCartController,
    updateCartController,
} from '../controllers/index.js'
import { cartSchema } from '../validations/index.js'
import { authGuard, checkValidatons, roleGuard } from '../middlewares/index.js'
import { config } from '../configs/index.js'

export const cartsRouter = new Router()

const secret = config.token.access.secret
const role = ['admin', 'manager', 'superAdmin']

cartsRouter.post(
    '/',
    checkValidatons(cartSchema),
    authGuard(secret),
    roleGuard(role),
    createCartController,
)
cartsRouter.get('/', getAllCartController)
cartsRouter.get('/:id', getByIdCartController)
cartsRouter.put(
    '/:id',
    authGuard(secret),
    roleGuard(role),
    updateCartController,
)
cartsRouter.delete(
    '/:id',
    authGuard(secret),
    roleGuard(role),
    deleteCartController,
)
