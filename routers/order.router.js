import express from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
const orderController = new OrderController();

// Protected routes (user)
router.use(authMiddleware);

// Order management
router.post('/', orderController.createOrder);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/cancel', orderController.cancelOrder);

// Order status updates (admin only)
router.put('/:id/status', orderController.updateOrderStatus);

// Payment
router.post('/:id/pay', orderController.processPayment);
router.get('/:id/payment-status', orderController.getPaymentStatus);

export default router;
