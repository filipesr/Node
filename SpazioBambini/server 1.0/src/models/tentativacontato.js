'use strict';
module.exports = (sequelize, DataTypes) => {
  const TentativaContato = sequelize.define('TentativaContato', {
    dataTentativa: DataTypes.DATE,
    atendeu: DataTypes.BOOLEAN,
    comentario: DataTypes.STRING
  }, {
    tableName: 'TentativasContato'
  });
  TentativaContato.associate = function (models) {
  };
  return TentativaContato;
};