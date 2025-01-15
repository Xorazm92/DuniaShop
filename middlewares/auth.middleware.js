import jwt from 'jsonwebtoken';
import { config } from '../configs/config.js';
import { logger } from '../utils/logger.js';

export const authMiddleware = async (req, res, next) => {
    try {
        // Token olish
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token topilmadi' });
        }

        const token = authHeader.split(' ')[1];

        // Token tekshirish
        const decoded = jwt.verify(token, config.jwt.secret);
        if (!decoded) {
            return res.status(401).json({ message: 'Yaroqsiz token' });
        }

        // User ma'lumotlarini req obyektiga qo'shish
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        next();
    } catch (error) {
        logger.error('Auth middleware error:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token muddati tugagan' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Yaroqsiz token' });
        }
        res.status(500).json({ message: 'Server xatosi' });
    }
};
