/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('profiles', (table) => {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary()
        table
            .uuid('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
        table.enum('type', ['individual', 'business']).notNullable()
        table.string('company_name')
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.string('phone').notNullable()
        table.text('address')
        table.date('birthday')
        table.integer('bonus_point').defaultTo(0)
        table.decimal('discount_rate', 5, 2).defaultTo(0)
        table.string('bank_account_number')
        table.timestamp('approval_date')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable('profiles')
}
