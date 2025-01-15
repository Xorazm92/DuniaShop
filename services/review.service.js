import db from '../database/index.js'

export const reviewService = {
    getAll: async (page = 1, limit = 10) => {
        try {
            const skip = (page - 1) * limit

            const reviews = await db('reviews')
                .select('*')
                .limit(limit)
                .offset(skip)

            return reviews
        } catch (error) {
            throw new Error('Error fetching reviews: ' + error.message)
        }
    },

    getById: async (id) => {
        try {
            const review = await db('reviews').select('*').where({ id }).first()

            if (!review) {
                throw new Error('Review not found')
            }

            return review
        } catch (error) {
            throw new Error('Error fetching review: ' + error.message)
        }
    },

    create: async (reviewData) => {
        try {
            const [newReview] = await db('reviews')
                .insert(reviewData)
                .returning('*')
            return newReview
        } catch (error) {
            throw new Error('Error creating review: ' + error.message)
        }
    },

    update: async (id, updateData) => {
        try {
            const [updatedReview] = await db('reviews')
                .where({ id })
                .update(updateData)
                .returning('*')

            if (!updatedReview) {
                throw new Error('Review not found or failed to update')
            }

            return updatedReview
        } catch (error) {
            throw new Error('Error updating review: ' + error.message)
        }
    },

    delete: async (id) => {
        try {
            const deletedReview = await db('reviews')
                .where({ id })
                .del()
                .returning('*')

            if (!deletedReview.length) {
                throw new Error('Review not found or failed to delete')
            }

            return deletedReview[0]
        } catch (error) {
            throw new Error('Error deleting review: ' + error.message)
        }
    },
}
