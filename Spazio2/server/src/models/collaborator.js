'use strict';
var bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborator', {
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    passwordHash: DataTypes.STRING,
    birth: DataTypes.DATE,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: async user => {
        if (user.password) {
          user.passwordHash = await bcrypt.hash(user.password, 8);
        }
      }
    }
  });
  
  Collaborator.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.passwordHash);
  };
  
  Collaborator.associate = function (models) {
    // associations can be defined here
  };
  
  return Collaborator;
};