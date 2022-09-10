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
      CourtId: {
=======
      CategoryId: {
>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
<<<<<<< HEAD
            msg: "CourtId is required",
          },
          notNull: {
            msg: "CourtId is required",
          },
        },
      },
      CategoryId: {
=======
            msg: "CategoryId is required",
          },
          notNull: {
            msg: "CategoryId is required",
          },
        },
      },
      CourtId: {
>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
<<<<<<< HEAD
            msg: "CategoryId is required",
          },
          notNull: {
            msg: "CategoryId is required",
=======
            msg: "CourtId is required",
          },
          notNull: {
            msg: "CourtId is required",
>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3
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
