import { logger } from '../utils/logger.js';
import { AppError } from '../utils/appError.js';

export const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        logger.error('Error 💥:', {
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });

        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        // Production mode
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }

        // Programming or unknown errors
        logger.error('Error 💥:', err);
        
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        });
    }
};
