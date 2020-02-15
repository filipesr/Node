'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Visits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bracelet: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      timeIn: {
        type: Sequelize.TIME
      },
      timeOut: {
        type: Sequelize.TIME
      },
      collaborator: {
        type: Sequelize.INTEGER
      },
      parent: {
        type: Sequelize.INTEGER
      },
      kid: {
        type: Sequelize.INTEGER
      },
      event: {
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
    return queryInterface.dropTable('Visits');
  }
};