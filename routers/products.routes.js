import { Router } from 'express'
import {
    createProductController,
    deleteProductController,
    getallProductController,
    getoneProductController,
    updateProductController,
} from '../controllers/index.js'
import { checkValidatons, authGuard, roleGuard } from '../middlewares/index.js'
import { productSchema } from '../validations/index.js'
import { config } from '../configs/index.js'

export const productRouter = Router()
const secret = config.token.access.secret

productRouter.get('/', getallProductController)
productRouter.get('/:id', getoneProductController)
productRouter.post(
    '/',
    authGuard(secret),
    roleGuard(['user', 'admin', 'manager']),
    checkValidatons(productSchema),
    createProductController,
)
productRouter.put(
    '/:id',
    authGuard(secret),
    roleGuard(['admin', 'manager']),
    updateProductController,
)
productRouter.delete(
    '/:id',
    authGuard(secret),
    roleGuard(['admin', 'manager']),
    deleteProductController,
)
