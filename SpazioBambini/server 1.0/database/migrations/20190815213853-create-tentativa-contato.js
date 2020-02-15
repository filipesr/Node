'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TentativasContato', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      visita: {
        type: Sequelize.UUID,
        references: {
          model: 'Visitas',
          key: 'id',
        },
      },
      responsavel: {
        type: Sequelize.UUID,
        references: {
          model: 'Responsaveis',
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
      dataTentativa: {
        type: Sequelize.DATE
      },
      atendeu: {
        type: Sequelize.BOOLEAN
      },
      comentario: {
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
    return queryInterface.dropTable('TentativasContato');
  }
};