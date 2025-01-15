import knex from 'knex';
import { config } from 'dotenv';
config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'raya_dunia',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres'
    },
    pool: {
        min: 2,
        max: 10
    }
});

export { db };
