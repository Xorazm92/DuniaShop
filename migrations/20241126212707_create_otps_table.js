/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('otps', (table) => {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary()
        table
            .uuid('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
        table.string('code').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.enum('status', ['active', 'expired', 'used']).defaultTo('active')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable('otps')
}
