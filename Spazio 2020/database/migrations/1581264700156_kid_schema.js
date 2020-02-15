'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KidSchema extends Schema {
  up () {
    this.create('kids', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(users)
      table
        .integer('parent_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(parents)

      table.string('name', 80).notNullable()
      table.date('birth')
      table.string('photo', 250)
      table.boolean('restriction')
      table.string('gender', 80)
      table.string('note', 240)

      table.timestamps()
    })
  }

  down () {
    this.drop('kids')
  }
}

module.exports = KidSchema
