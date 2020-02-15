'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parent = sequelize.define('Parent', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    phone2: DataTypes.STRING,
    cpf: DataTypes.STRING,
    avatar: DataTypes.STRING,
    termAccepted: DataTypes.BOOLEAN,
    collaborator: DataTypes.INTEGER
  }, {});
  Parent.associate = function(models) {
    // associations can be defined here
  };
  return Parent;
};