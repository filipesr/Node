'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IncidentKidSchema extends Schema {
  up () {
    this.create('incidents_kids', (table) => {
      table.increments()
      table
        .integer('user_id')
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
      table
        .integer('incident_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(incidents)

      table.date('dateIncident')
      table.string('note', 250)

      table.timestamps()
    })
  }

  down () {
    this.drop('incidents_kids')
  }
}

module.exports = IncidentKidSchema
