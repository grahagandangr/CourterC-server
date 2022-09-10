"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username is required",
          },
          notNull: {
            msg: "Username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
<<<<<<< HEAD
        unique: {
          msg: "Email already used",
        },
=======
>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
<<<<<<< HEAD
=======
          unique: {
            msg: "Email already used",
          },
>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
          len: {
            args: 5,
            msg: "Password minimum length is 5",
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
<<<<<<< HEAD
      balance: DataTypes.INTEGER,
      location: DataTypes.GEOMETRY,
=======
      address: DataTypes.TEXT,
      balance: DataTypes.INTEGER,
>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
