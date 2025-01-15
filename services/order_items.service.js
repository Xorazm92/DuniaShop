import { AppError } from '../utils/index.js'

export const orderItemsService = {
    getAll: async (page = 1, limit = 10) => {
        try {
            const skip = (page - 1) * limit
            const orderItems = await db('order_items')
                .select('*')
                .limit(limit)
                .offset(skip)

            return orderItems
        } catch (error) {
            throw new AppError('Error order items get all', 500)
        }
    },

    getById: async (id) => {
        try {
            const orderItem = await db('order_items')
                .select('*')
                .where({ id })
                .first()

            if (!orderItem) {
                throw new AppError('Order_item not found', 404)
            }

            return orderItem
        } catch (error) {
            throw new AppError('Error get by id', 500)
        }
    },

    getByOrderId: async (orderId) => {
        try {
            const orderItems = await db('order_items')
                .select('*')
                .where({ order_id: orderId })

            if (!orderItems.length) {
                throw new AppError('No order items found in this ID', 404)
            }

            return orderItems
        } catch (error) {
            throw new AppError('Error fetching order items by order id', 500)
        }
    },

    create: async (orderItemData) => {
        try {
            const [newOrderItem] = await db('order_items')
                .insert(orderItemData)
                .returning('*')
            return newOrderItem
        } catch (error) {
            throw new AppError('Error creating order item', 500)
        }
    },

    update: async (id, updateData) => {
        try {
            const [updatedOrderItem] = await db('order_items')
                .where({ id })
                .update(updateData)
                .returning('*')

            if (!updatedOrderItem) {
                throw new AppError('Order item not found to update', 404)
            }

            return updatedOrderItem
        } catch (error) {
            throw new AppError('Error updating order_items', 500)
        }
    },

    delete: async (id) => {
        try {
            const deletedOrderItem = await db('order_items')
                .where({ id })
                .del()
                .returning('*')

            if (!deletedOrderItem.length) {
                throw new AppError('Order item not found to delete', 404)
            }

            return deletedOrderItem[0]
        } catch (error) {
            throw new AppError('Error deleting order_items', 500)
        }
    },
}
