'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParentSchema extends Schema {
  up () {
    this.create('parents', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(users)

      table.string('name', 80).notNullable()
      table.string('phone1', 20).notNullable()
      table.string('phone2', 20).notNullable()
      table.string('note', 240)
      table.string('photo', 240)
      table.string('cpf', 20).notNullable()
      table.boolean('termAccepted')

      table.timestamps()
    })
  }

  down () {
    this.drop('parents')
  }
}

module.exports = ParentSchema
