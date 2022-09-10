<<<<<<< HEAD
"use strict";
const { Model } = require("sequelize");
=======
'use strict';
const {
  Model
} = require('sequelize');
>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
<<<<<<< HEAD
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category Name is required",
          },
          notNull: {
            msg: "Category Name is required",
          },
        },
      },
      iconName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Icon name is required",
          },
          notNull: {
            msg: "Icon name is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
=======
  Category.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3
