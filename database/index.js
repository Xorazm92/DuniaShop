import knex from 'knex'
import config from '../../knexfile.js'

const db = knex({
    client: 'pg',
    connection: config.development.connection,
})
export default db
