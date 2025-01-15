import db from '../database/index.js'
import { AppError } from '../utils/index.js'

export const ordersService = {
    getAll: async (page = 1, limit = 10) => {
        try {
            const skip = (page - 1) * limit
            const orders = await db('orders')
                .select('*')
                .limit(limit)
                .offset(skip)

            return orders
        } catch (error) {
            throw new AppError('Error fetching orders', 500)
        }
    },

    getById: async (id) => {
        try {
            const order = await db('orders').select('*').where({ id }).first()
            if (!order) throw new AppError('Order not found', 404)
            return order
        } catch (error) {
            throw new AppError('Error fetching order', 500)
        }
    },

    create: async (orderData) => {
        try {
            const [newOrder] = await db('orders')
                .insert(orderData)
                .returning('*')
            return newOrder
        } catch (error) {
            throw new AppError('Error creating order', 500)
        }
    },

    update: async (id, updateData) => {
        try {
            const [updatedOrder] = await db('orders')
                .where({ id })
                .update(updateData)
                .returning('*')

            if (!updatedOrder)
                throw new AppError('Order not found to update', 404)

            return updatedOrder
        } catch (error) {
            throw new AppError('Error updating order', 500)
        }
    },

    delete: async (id) => {
        try {
            const deletedOrder = await db('orders')
                .where({ id })
                .del()
                .returning('*')

            if (!deletedOrder.length)
                throw new AppError('Order not found to delete', 404)

            return deletedOrder[0]
        } catch (error) {
            throw new AppError('Error deleting order', 500)
        }
    },
}
