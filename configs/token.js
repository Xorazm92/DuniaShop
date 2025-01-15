import { config } from 'dotenv';

config();

export const token = {
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: '24h'
    }
};
