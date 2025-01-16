import { Router } from 'express';
import productRouter from './product.router.js';
import { authRouter } from './auth.routes.js';
import orderRouter from './order.router.js';

export const routers = Router();

// Views
routers.use('/', authRouter);
routers.use('/products', productRouter);
routers.use('/orders', orderRouter);
