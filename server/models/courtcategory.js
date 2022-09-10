"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourtCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CourtCategory.belongsTo(models.Category);
      CourtCategory.belongsTo(models.Court);
      CourtCategory.hasMany(models.Order)
    }
  }
  CourtCategory.init(
    {
      CourtId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "CourtId is required",
          },
          notNull: {
            msg: "CourtId is required",
          },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "CategoryId is required",
          },
          notNull: {
            msg: "CategoryId is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price is required",
          },
          notNull: {
            msg: "Price is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "CourtCategory",
    }
  );
  return CourtCategory;
};
