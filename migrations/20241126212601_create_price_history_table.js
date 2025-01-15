/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('price_history', (table) => {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary()
        table
            .uuid('product_id')
            .references('id')
            .inTable('products')
            .onDelete('CASCADE')
        table.decimal('old_price', 10, 2).notNullable()
        table.decimal('new_price', 10, 2).notNullable()
        table
            .uuid('modified_by_user_id')
            .references('id')
            .inTable('users')
            .onDelete('SET NULL')
        table.timestamp('modified_at').defaultTo(knex.fn.now())
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable('price_history')
}
