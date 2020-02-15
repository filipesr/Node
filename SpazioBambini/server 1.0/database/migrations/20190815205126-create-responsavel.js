'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Responsaveis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      colaborador: {
        type: Sequelize.UUID,
        references: {
          model: 'Colaboradores',
          key: 'id',
        },
      },
      nome: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      telefone2: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      termoAceito: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Responsaveis');
  }
};