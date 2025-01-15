/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('password_resets', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
        table.uuid('user_id').notNullable()
        table.string('token').notNullable()
        table.timestamp('expires_at').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())

        table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('password_resets')
}
