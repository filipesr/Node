'use strict';
module.exports = (sequelize, DataTypes) => {
  const Visita = sequelize.define('Visita', {
    codigoPulseira: DataTypes.STRING,
    comentario: DataTypes.STRING,
    horaEntrada: DataTypes.TIME,
    horaSaida: DataTypes.TIME
  }, {
      tableName: 'Visitas'
    });
  Visita.associate = function (models) {
    Visita.belongsTo(models.Crianca, { as: 'Crianca', foreignKey: 'crianca' })
    Visita.belongsTo(models.Responsavel, { as: 'Responsavel', foreignKey: 'responsavel' })
    Visita.belongsTo(models.Evento, { as: 'Evento', foreignKey: 'evento' })
    Visita.belongsTo(models.Colaborador, { as: 'Colaborador', foreignKey: 'colaborador' })
  };

  return Visita;
};