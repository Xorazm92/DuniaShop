import express from 'express'
import { paymentsController } from '../controllers/index.js'
import { authGuard, checkValidatons, roleGuard } from '../middlewares/index.js'
import { paymentBodySchema } from '../validations/index.js'
import { config } from '../configs/index.js'

export const paymentsRouter = express.Router()

const secret = config.token.access.secret

paymentsRouter.get('/', paymentsController.getAll)
paymentsRouter.get('/:id', paymentsController.getById)
paymentsRouter.post(
    '/',
    authGuard(secret),
    roleGuard(['admin']),
    checkValidatons(paymentBodySchema),
    paymentsController.create,
)
paymentsRouter.put(
    '/:id',
    authGuard(secret),
    roleGuard(['admin']),
    paymentsController.update,
)
paymentsRouter.delete(
    '/:id',
    authGuard(secret),
    roleGuard(['admin']),
    paymentsController.delete,
)
