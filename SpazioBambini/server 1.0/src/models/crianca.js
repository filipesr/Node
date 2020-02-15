'use strict';

module.exports = (sequelize, DataTypes) => {
  const Crianca = sequelize.define('Crianca', {
    nome: DataTypes.STRING,
    dataNascimento: DataTypes.DATE,
    foto: DataTypes.STRING,
    restricaoAcesso: DataTypes.BOOLEAN,
    genero: DataTypes.STRING
  }, {
    tableName: 'Criancas'
  });
  Crianca.associate = function (models) {
    Crianca.hasMany(models.OcorrenciaCrianca,{as: 'OcorrenciasCrianca', foreignKey: 'crianca'})
    Crianca.hasMany(models.Visita,{as: 'Visitas', foreignKey: 'crianca'})
  };
  return Crianca;
};