/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('payments', (table) => {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary()
        table
            .uuid('order_id')
            .references('id')
            .inTable('orders')
            .onDelete('CASCADE')
        table
            .uuid('payer_id')
            .references('id')
            .inTable('users')
            .onDelete('SET NULL')
        table.decimal('amount', 10, 2).notNullable()
        table
            .enum('payment_type', [
                'credit_card',
                'debit_card',
                'paypal',
                'bank_transfer',
                'cash',
            ])
            .notNullable()
        table
            .enum('status', ['pending', 'paid', 'failed', 'refunded'])
            .defaultTo('pending')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable('payments')
}
