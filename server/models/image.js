<<<<<<< HEAD
=======

>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3
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
      imgUrl: {
=======
      imageUrl: {
>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
<<<<<<< HEAD
            msg: "Image Url is required",
          },
          notNull: {
            msg: "Image Url is required",
=======
            msg: "imageUrl is required",
          },
          notNull: {
            msg: "imageUrl is required",
>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3
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
