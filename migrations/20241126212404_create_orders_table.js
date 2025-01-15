/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('orders', (table) => {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary()
        table
            .uuid('customer_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
        table.decimal('total_amount', 10, 2).notNullable()
        table.decimal('discount_amount', 10, 2)
        table.decimal('delivery_fee', 10, 2)
        table
            .enum('status', [
                'pending',
                'confirmed',
                'delivered',
                'cancelled',
                'returned',
                'failed',
            ])
            .defaultTo('pending')
        table
            .enum('delivery_type', [
                'standard',
                'express',
                'same_day',
                'pickup',
                'scheduled',
                'international',
                'drone',
            ])
            .defaultTo('standard')
        table.text('delivery_address')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable('orders')
}
