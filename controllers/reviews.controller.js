import { reviewService } from '../services/index.js'

export const getAllReviewController = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const reviews = await reviewService.getAll(page, limit)

        if (reviews.length === 0) {
            return res.status(404).send({
                status: 'Not Found',
                message: 'No reviews found',
            })
        }

        return res.status(200).send({
            status: 'Success',
            page,
            limit,
            reviews,
        })
    } catch (error) {
        next(error)
    }
}

export const getOneReviewController = async (req, res, next) => {
    try {
        const id = req.params.id
        const review = await reviewService.getById(id)

        return res.status(200).send({
            status: 'Success',
            review,
        })
    } catch (error) {
        next(error)
    }
}

export const createReviewController = async (req, res, next) => {
    try {
        const newReview = await reviewService.create(req.body)

        return res.status(201).send({
            status: 'Created',
            review: newReview,
        })
    } catch (error) {
        next(error)
    }
}

export const updateReviewController = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedReview = await reviewService.update(id, req.body)

        return res.status(200).send({
            status: 'Success',
            review: updatedReview,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteReviewController = async (req, res, next) => {
    try {
        const id = req.params.id
        const deletedReview = await reviewService.delete(id)

        return res.status(200).send({
            status: 'Deleted',
            message: 'Review deleted successfully',
            review: deletedReview,
        })
    } catch (error) {
        next(error)
    }
}
