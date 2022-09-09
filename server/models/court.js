'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Court extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Court.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.GEOMETRY,
    address: DataTypes.STRING,
    openHour: DataTypes.INTEGER,
    closeHour: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Court',
  });
  return Court;
};