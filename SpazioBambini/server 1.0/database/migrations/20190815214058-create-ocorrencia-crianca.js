'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OcorrenciasCrianca', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ocorrencia: {
        type: Sequelize.UUID,
        references: {
          model: 'Ocorrencias',
          key: 'id',
        },
      },
      crianca: {
        type: Sequelize.UUID,
        references: {
          model: 'Criancas',
          key: 'id',
        },
      },
      colaborador: {
        type: Sequelize.UUID,
        references: {
          model: 'Colaboradores',
          key: 'id',
        },
      },
      dataOcorrencia: {
        type: Sequelize.DATE
      },
      comentario: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('OcorrenciasCrianca');
  }
};