import { config } from 'dotenv';

config();

export const app = {
    port: process.env.PORT || 5053,
    node_env: process.env.NODE_ENV,
};
