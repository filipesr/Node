'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Visitas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      responsavel: {
        type: Sequelize.UUID,
        references: {
          model: 'Responsaveis',
          key: 'id',
        },
      },
      evento: {
        type: Sequelize.UUID,
        references: {
          model: 'Eventos',
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
      codigoPulseira: {
        type: Sequelize.STRING
      },
      comentario: {
        type: Sequelize.STRING
      },
      horaEntrada: {
        type: Sequelize.TIME
      },
      horaSaida: {
        type: Sequelize.TIME
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
    return queryInterface.dropTable('Visitas');
  }
};