'use strict';

module.exports = (sequelize, DataTypes) => {
  const Ocorrencia = sequelize.define('Ocorrencia', {
    nome: DataTypes.STRING,
    gravidade: DataTypes.INTEGER,
    resposta: DataTypes.STRING
  }, {
      tableName: 'Ocorrencias'
    });
  Ocorrencia.associate = function (models) {
    Ocorrencia.hasMany(models.OcorrenciaCrianca, { as: 'OcorrenciasCrianca', foreignKey: 'ocorrencia' })
  };

  return Ocorrencia;
};