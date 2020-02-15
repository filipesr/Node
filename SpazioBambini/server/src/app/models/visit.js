'use strict';
module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define('Visit', {
    bracelet: DataTypes.STRING,
    comment: DataTypes.STRING,
    timeIn: DataTypes.TIME,
    timeOut: DataTypes.TIME
  }, {});
  Visit.associate = function(models) {
    // associations can be defined here
    Visit.belongsTo(models.Kid, { foreignKey: 'kid' })
    Visit.belongsTo(models.Parent, { foreignKey: 'parent' })
    Visit.belongsTo(models.Event, { foreignKey: 'event' })
    Visit.belongsTo(models.Collaborator, { foreignKey: 'collaborator' })
  };
  return Visit;
};