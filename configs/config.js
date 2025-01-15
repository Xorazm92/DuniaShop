import dotenv from 'dotenv';

// .env faylini o'qish
dotenv.config();

export const config = {
    app: {
        port: process.env.PORT || 5050,
        env: process.env.NODE_ENV || 'development'
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'raya_dunia',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    },
    mail: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: process.env.MAIL_PORT || 587,
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    payment: {
        merchantId: process.env.PAYMENT_MERCHANT_ID,
        secretKey: process.env.PAYMENT_SECRET_KEY,
        returnUrl: process.env.PAYMENT_RETURN_URL || 'http://localhost:5050/payment/callback'
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true
    }
};
