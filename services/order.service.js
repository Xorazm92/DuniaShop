import { db } from '../configs/db.js';
import { logger } from '../utils/logger.js';

export class OrderService {
    async createOrder(orderData) {
        try {
            const [order] = await db('orders')
                .insert(orderData)
                .returning('*');
            return order;
        } catch (error) {
            logger.error('Create order error:', error);
            throw error;
        }
    }

    async getOrders(userId) {
        try {
            const orders = await db('orders')
                .where({ user_id: userId })
                .select('*');
            return orders;
        } catch (error) {
            logger.error('Get orders error:', error);
            throw error;
        }
    }

    async getOrderById(orderId, userId) {
        try {
            const order = await db('orders')
                .where({ 
                    id: orderId,
                    user_id: userId 
                })
                .first();
            return order;
        } catch (error) {
            logger.error('Get order by ID error:', error);
            throw error;
        }
    }

    async updateOrder(orderId, userId, updateData) {
        try {
            const [updatedOrder] = await db('orders')
                .where({ 
                    id: orderId,
                    user_id: userId 
                })
                .update(updateData)
                .returning('*');
            return updatedOrder;
        } catch (error) {
            logger.error('Update order error:', error);
            throw error;
        }
    }

    async deleteOrder(orderId, userId) {
        try {
            const deletedCount = await db('orders')
                .where({ 
                    id: orderId,
                    user_id: userId 
                })
                .delete();
            return deletedCount > 0;
        } catch (error) {
            logger.error('Delete order error:', error);
            throw error;
        }
    }
}
