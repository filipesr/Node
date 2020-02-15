'use strict';
module.exports = (sequelize, DataTypes) => {
  const OcorrenciaCrianca = sequelize.define('OcorrenciaCrianca', {
    dataOcorrencia: DataTypes.DATE,
    comentario: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
      tableName: 'OcorrenciasCrianca'
    });
  OcorrenciaCrianca.associate = function (models) {
  };
  return OcorrenciaCrianca;
};