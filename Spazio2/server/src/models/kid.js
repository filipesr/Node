'use strict';

module.exports = (sequelize, DataTypes) => {
  const Kid = sequelize.define('Kid', {
    name: DataTypes.STRING,
    birth: DataTypes.DATE,
    avatar: DataTypes.STRING,
    restriction: DataTypes.BOOLEAN,
    gender: DataTypes.STRING,
    collaborator: DataTypes.INTEGER,
    parent: DataTypes.INTEGER
  }, {});
  Kid.associate = function(models) {
    // associations can be defined here
    Kid.hasMany(models.Visit, {foreignKey: 'kid', sourceKey: 'id'})
  };
  return Kid;
};