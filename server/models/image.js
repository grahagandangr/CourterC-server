<<<<<<< HEAD

=======
>>>>>>> seedingDummy
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Image.init(
    {
<<<<<<< HEAD
      imageUrl: {
=======
      imgUrl: {
>>>>>>> seedingDummy
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
<<<<<<< HEAD
            msg: "imageUrl is required",
          },
          notNull: {
            msg: "imageUrl is required",
=======
            msg: "Image Url is required",
          },
          notNull: {
            msg: "Image Url is required",
>>>>>>> seedingDummy
          },
        },
      },
      CourtCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "CourtCategoryId is required",
          },
          notNull: {
            msg: "CourtCategoryId is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
