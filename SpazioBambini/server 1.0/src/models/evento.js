'use strict';
module.exports = (sequelize, DataTypes) => {
  const Evento = sequelize.define('Evento', {
    nome: DataTypes.STRING,
    dataEvento: DataTypes.DATE,
    tempoPermanencia: DataTypes.INTEGER,
    capacidade: DataTypes.INTEGER
  }, {
    tableName: 'Eventos'
  });
  Evento.associate = function(models) {
    Evento.hasMany(models.Visita,{as: 'Visitas', foreignKey: 'evento'})
    // associations can be defined here
  };
  return Evento;
};