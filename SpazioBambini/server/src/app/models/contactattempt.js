'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContactAttempt = sequelize.define('ContactAttempt', {
    dateAttempt: DataTypes.DATE,
    answered: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    collaborator: DataTypes.INTEGER,
    parent: DataTypes.INTEGER
  }, {});
  ContactAttempt.associate = function(models) {
    // associations can be defined here
  };
  return ContactAttempt;
};