/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('products', (table) => {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary()
        table.string('name').notNullable()
        table.string('short_description')
        table.text('full_description')
        table
            .uuid('category_id')
            .references('id')
            .inTable('categories')
            .onDelete('SET NULL')
        table
            .uuid('seller_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
        table.decimal('price', 10, 2).notNullable()
        table.decimal('discount_price', 10, 2)
        table.integer('quantity').defaultTo(0)
        table.enum('status', ['active', 'sold', 'on_sale']).defaultTo('active')
        table.specificType('image_urls', 'text[]')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable('products')
}
