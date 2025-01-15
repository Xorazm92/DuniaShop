import express from 'express'
import { ordersController } from '../controllers/index.js'
import { authGuard, checkValidatons, roleGuard } from '../middlewares/index.js'
import { orderBodySchema } from '../validations/index.js'
import { config } from '../configs/index.js'

export const orderRouter = express.Router()
const secret = config.token.access.secret

orderRouter.get('/', ordersController.getAll)
orderRouter.get(
    '/:id',
    authGuard(secret),
    roleGuard(['user', 'admin']),
    ordersController.getById,
)
orderRouter.post(
    '/',
    authGuard(secret),
    roleGuard(['user', 'admin']),
    checkValidatons(orderBodySchema),
    ordersController.create,
)
orderRouter.put(
    '/:id',
    authGuard(secret),
    roleGuard(['user', 'admin']),
    ordersController.update,
)
orderRouter.delete(
    '/:id',
    authGuard(secret),
    roleGuard(['user', 'admin']),
    ordersController.delete,
)
