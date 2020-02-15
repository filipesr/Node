'use strict';
module.exports = (sequelize, DataTypes) => {
  const Responsavel = sequelize.define('Responsavel', {
    nome: DataTypes.STRING,
    telefone: DataTypes.STRING,
    telefone2: DataTypes.STRING,
    cpf: DataTypes.STRING,
    foto: DataTypes.STRING,
    termoAceito: DataTypes.BOOLEAN
  }, {
    tableName: 'Responsaveis'
  });
  Responsavel.associate = function(models) {
    Responsavel.hasMany(models.Visita,{as: 'Visitas', foreignKey: 'responsavel'})
    Responsavel.hasMany(models.TentativaContato,{as: 'TentativasContato', foreignKey: 'responsavel'})
  };
  return Responsavel;
};