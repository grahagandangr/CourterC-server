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
    }
  }
  CourtCategory.init(
    {
<<<<<<< HEAD
      CategoryId: {
=======
      CourtId: {
>>>>>>> seedingDummy
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
<<<<<<< HEAD
            msg: "CategoryId is required",
          },
          notNull: {
            msg: "CategoryId is required",
          },
        },
      },
      CourtId: {
=======
            msg: "CourtId is required",
          },
          notNull: {
            msg: "CourtId is required",
          },
        },
      },
      CategoryId: {
>>>>>>> seedingDummy
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
<<<<<<< HEAD
            msg: "CourtId is required",
          },
          notNull: {
            msg: "CourtId is required",
=======
            msg: "CategoryId is required",
          },
          notNull: {
            msg: "CategoryId is required",
>>>>>>> seedingDummy
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
