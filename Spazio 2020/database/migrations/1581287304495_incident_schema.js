'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IncidentSchema extends Schema {
  up () {
    this.create('incidents', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(users)

      table.string('name', 80).notNullable()
      table.string('type', 20).notNullable()
      table.string('note', 240)

      table.timestamps()
    })
  }

  down () {
    this.drop('incidents')
  }
}

module.exports = IncidentSchema
