import db from '../database/index.js'
import { AppError } from '../utils/index.js'

export const paymentsService = {
    getAll: async (page = 1, limit = 10) => {
        try {
            const skip = (page - 1) * limit
            const payments = await db('payments')
                .select('*')
                .limit(limit)
                .offset(skip)

            return payments
        } catch (error) {
            throw new AppError('Error fetching payments', 500)
        }
    },

    getById: async (id) => {
        try {
            const payment = await db('payments')
                .select('*')
                .where({ id })
                .first()
            if (!payment) throw new AppError('Payment not found', 404)
            return payment
        } catch (error) {
            throw new AppError('Error fetching payment', 500)
        }
    },

    create: async (paymentData) => {
        try {
            const [newPayment] = await db('payments')
                .insert(paymentData)
                .returning('*')
            return newPayment
        } catch (error) {
            throw new AppError('Error creating payment', 500)
        }
    },

    update: async (id, updateData) => {
        try {
            const [updatedPayment] = await db('payments')
                .where({ id })
                .update(updateData)
                .returning('*')

            if (!updatedPayment)
                throw new AppError('Payment not found or failed to update', 404)

            return updatedPayment
        } catch (error) {
            throw new AppError('Error updating payment', 500)
        }
    },

    delete: async (id) => {
        try {
            const deletedPayment = await db('payments')
                .where({ id })
                .del()
                .returning('*')

            if (!deletedPayment.length)
                throw new AppError('Payment not found or failed to delete', 404)

            return deletedPayment[0]
        } catch (error) {
            throw new AppError('Error deleting payment', 500)
        }
    },
}
