'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventSchema extends Schema {
  up () {
    this.create('events', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(users)

      table.string('name', 80).notNullable()
      table.date('dateEvent').notNullable()
      table.integer('duration').notNullable()
      table.integer('capacity').notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventSchema
