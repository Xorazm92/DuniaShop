import express from 'express';
import productRouter from './product.router.js';
import authRouter from './auth.router.js';
import orderRouter from './order.router.js';

export const routers = express.Router();

routers.use('/products', productRouter);
routers.use('/auth', authRouter);
routers.use('/orders', orderRouter);
