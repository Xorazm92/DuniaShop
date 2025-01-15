import { OrderService } from '../services/order.service.js';
import { logger } from '../utils/logger.js';

export class OrderController {
    constructor() {
        this.orderService = new OrderService();
    }

    createOrder = async (req, res) => {
        try {
            const userId = req.user.id;
            const orderData = req.body;
            const order = await this.orderService.createOrder(userId, orderData);
            res.status(201).json(order);
        } catch (error) {
            logger.error('Create order error:', error);
            res.status(500).json({ message: 'Buyurtma yaratishda xatolik yuz berdi' });
        }
    }

    getUserOrders = async (req, res) => {
        try {
            const userId = req.user.id;
            const { page = 1, limit = 10, status } = req.query;
            const orders = await this.orderService.getUserOrders(userId, { page, limit, status });
            res.json(orders);
        } catch (error) {
            logger.error('Get user orders error:', error);
            res.status(500).json({ message: 'Buyurtmalarni olishda xatolik yuz berdi' });
        }
    }

    getOrderById = async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const order = await this.orderService.getOrderById(id, userId);
            
            if (!order) {
                return res.status(404).json({ message: 'Buyurtma topilmadi' });
            }

            res.json(order);
        } catch (error) {
            logger.error('Get order error:', error);
            res.status(500).json({ message: 'Buyurtmani olishda xatolik yuz berdi' });
        }
    }

    cancelOrder = async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const order = await this.orderService.cancelOrder(id, userId);
            
            if (!order) {
                return res.status(404).json({ message: 'Buyurtma topilmadi' });
            }

            res.json(order);
        } catch (error) {
            logger.error('Cancel order error:', error);
            res.status(500).json({ message: 'Buyurtmani bekor qilishda xatolik yuz berdi' });
        }
    }

    updateOrderStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const order = await this.orderService.updateOrderStatus(id, status);
            
            if (!order) {
                return res.status(404).json({ message: 'Buyurtma topilmadi' });
            }

            res.json(order);
        } catch (error) {
            logger.error('Update order status error:', error);
            res.status(500).json({ message: 'Buyurtma holatini yangilashda xatolik yuz berdi' });
        }
    }

    processPayment = async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const paymentData = req.body;
            const payment = await this.orderService.processPayment(id, userId, paymentData);
            res.json(payment);
        } catch (error) {
            logger.error('Process payment error:', error);
            res.status(500).json({ message: 'To\'lovni amalga oshirishda xatolik yuz berdi' });
        }
    }

    getPaymentStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const status = await this.orderService.getPaymentStatus(id, userId);
            res.json(status);
        } catch (error) {
            logger.error('Get payment status error:', error);
            res.status(500).json({ message: 'To\'lov holatini olishda xatolik yuz berdi' });
        }
    }
}
