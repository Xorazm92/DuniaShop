import { config } from 'dotenv';
config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'raya_dunia',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres'
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host: 'staging-host',
      database: 'staging_database',
      user: 'staging_user',
      password: 'staging_password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: 'production-host',
      database: 'production_database',
      user: 'production_user',
      password: 'production_password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
}
