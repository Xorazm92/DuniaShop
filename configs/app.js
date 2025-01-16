import { config } from 'dotenv';

config();

export const app = {
    port: process.env.PORT || 3000,
    node_env: process.env.NODE_ENV || 'development',
};
