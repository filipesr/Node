'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VisitSchema extends Schema {
  up () {
    this.create('visits', (table) => {
      table.increments()

      table
        .integer('user_id_in')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(users)
      table
        .integer('user_id_out')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(users)
      table
        .integer('kid_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(kids)

      table.date('dateVisit')
      table.time('timeIn')
      table.time('timeOut')
      table.string('bracelet', 20)

      table.timestamps()
    })
  }

  down () {
    this.drop('visits')
  }
}

module.exports = VisitSchema
