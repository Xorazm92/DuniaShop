import { Router } from 'express'
import {
    createReviewController,
    deleteReviewController,
    getAllReviewController,
    getOneReviewController,
    updateReviewController,
} from '../controllers/reviews.controller.js'
import { checkValidatons, authGuard, roleGuard } from '../middlewares/index.js'
import { reviewSchema } from '../validations/index.js'
import { config } from '../configs/index.js'

export const reviewRouter = Router()
const secret = config.token.access.secret

reviewRouter.get('/', getAllReviewController)
reviewRouter.get('/:id', getOneReviewController)
reviewRouter.post(
    '/',
    authGuard(secret),
    roleGuard(['user', 'admin', 'manager']),
    checkValidatons(reviewSchema),
    createReviewController,
)
reviewRouter.put(
    '/:id',
    authGuard(secret),
    roleGuard(['admin', 'manager']),
    updateReviewController,
)
reviewRouter.delete(
    '/:id',
    authGuard(secret),
    roleGuard(['admin', 'manager']),
    deleteReviewController,
)
