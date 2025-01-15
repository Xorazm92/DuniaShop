import db from '../database/index.js'
import { AppError } from '../utils/index.js'

export const priceHistoryService = {
    getAll: async () => {
        try {
            const history = await db('price_history').select('*')
            return history
        } catch (error) {
            throw new AppError('Error fetching price history', 500)
        }
    },

    getById: async (id) => {
        try {
            const history = await db('price_history')
                .select('*')
                .where({ id })
                .first()
            if (!history)
                throw new AppError('Price history entry not found', 404)
            return history
        } catch (error) {
            throw new AppError('Error fetching price history entry', 500)
        }
    },

    getByProductId: async (productId) => {
        try {
            const history = await db('price_history')
                .select('*')
                .where({ product_id: productId })
            if (!history.length)
                throw new AppError(
                    'No price history found for this product',
                    404,
                )
            return history
        } catch (error) {
            throw new AppError('Error fetching price history for product', 500)
        }
    },

    getByUserId: async (userId) => {
        try {
            const history = await db('price_history')
                .select('*')
                .where({ modified_by_user_id: userId })
            if (!history.length) throw new AppError('No  found ', 404)
            return history
        } catch (error) {
            throw new AppError('Error fetching price history', 500)
        }
    },

    create: async (historyData) => {
        try {
            const [newHistory] = await db('price_history')
                .insert(historyData)
                .returning('*')
            return newHistory
        } catch (error) {
            throw new AppError('Error creating price history entry', 500)
        }
    },

    update: async (id, updateData) => {
        try {
            const [updatedHistory] = await db('price_history')
                .where({ id })
                .update(updateData)
                .returning('*')
            if (!updatedHistory)
                throw new AppError('Price history not found to update', 404)
            return updatedHistory
        } catch (error) {
            throw new AppError('Error updating price history entry', 500)
        }
    },

    delete: async (id) => {
        try {
            const deletedHistory = await db('price_history')
                .where({ id })
                .del()
                .returning('*')
            if (!deletedHistory.length)
                throw new AppError('Price history not found to delete', 404)
            return deletedHistory[0]
        } catch (error) {
            throw new AppError('Error deleting price history', 500)
        }
    },
}
