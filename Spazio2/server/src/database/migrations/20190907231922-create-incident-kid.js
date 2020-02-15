'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('IncidentKids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateIncident: {
        type: Sequelize.DATE
      },
      comment: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      collaborator: {
        type: Sequelize.INTEGER
      },
      kid: {
        type: Sequelize.INTEGER
      },
      incident: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('IncidentKids');
  }
};