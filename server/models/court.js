"use strict";
const { Model } = require("sequelize");
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
  Court.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
          notNull: {
            msg: "Description is required",
          },
        },
      },
      location: {
        type: DataTypes.GEOMETRY,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Location is required",
          },
          notNull: {
            msg: "Location is required",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address is required",
          },
          notNull: {
            msg: "Address is required",
          },
        },
      },
      openHour: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Open Hour is required",
          },
          notNull: {
            msg: "Open Hour is required",
          },
        },
      },
      closeHour: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Close Hour is required",
          },
          notNull: {
            msg: "Close Hour is required",
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Court",
    }
  );
  return Court;
};