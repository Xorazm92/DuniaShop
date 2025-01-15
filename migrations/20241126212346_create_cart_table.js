/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('cart', (table) => {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary()
        table
            .uuid('customer_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
        table
            .uuid('product_id')
            .references('id')
            .inTable('products')
            .onDelete('CASCADE')
        table.integer('quantity').defaultTo(1).notNullable()
        table.timestamp('added_at').defaultTo(knex.fn.now())
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable('cart')
}
