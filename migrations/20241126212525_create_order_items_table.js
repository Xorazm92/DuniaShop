/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('order_items', (table) => {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary()
        table
            .uuid('order_id')
            .references('id')
            .inTable('orders')
            .onDelete('CASCADE')
        table
            .uuid('product_id')
            .references('id')
            .inTable('products')
            .onDelete('CASCADE')
        table.integer('quantity').notNullable().defaultTo(1)
        table.decimal('price', 10, 2).notNullable()
        table.decimal('discount_percent', 5, 2)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable('order_items')
}
