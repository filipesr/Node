'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParentKidSchema extends Schema {
  up () {
    this.create('parents_kids', (table) => {
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
      table
        .integer('kid_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(kids)

      table.timestamps()
    })
  }

  down () {
    this.drop('parents_kids')
  }
}

module.exports = ParentKidSchema
