'use strict';
module.exports = (sequelize, DataTypes) => {
  const IncidentKid = sequelize.define('IncidentKid', {
    dateIncident: DataTypes.DATE,
    comment: DataTypes.STRING,
    photo: DataTypes.STRING,
    collaborator: DataTypes.INTEGER,
    kid: DataTypes.INTEGER,
    incident: DataTypes.INTEGER
  }, {});
  IncidentKid.associate = function(models) {
    // associations can be defined here
  };
  return IncidentKid;
};