import { config } from 'dotenv';

config();

export const token = {
    jwt: {
        access: {
            secret: process.env.JWT_ACCESS_SECRET || '12345',
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1h'
        },
        refresh: {
            secret: process.env.JWT_REFRESH_SECRET || 'qwert',
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
        },
        forgetPassword: {
            secret: process.env.JWT_FORGET_PASSWORD_SECRET || 'asdfg',
            expiresIn: process.env.JWT_FORGET_PASSWORD_EXPIRES_IN || '5m'
        }
    }
};
