'use strict';
module.exports = (sequelize, DataTypes) => {
  const Incident = sequelize.define('Incident', {
    name: DataTypes.STRING,
    severity: DataTypes.STRING,
    response: DataTypes.STRING
  }, {});
  Incident.associate = function(models) {
    // associations can be defined here
  };
  return Incident;
};