'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderDetail.init({
    date: DataTypes.DATE,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    CourtCategoryId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER,
    ScheduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};