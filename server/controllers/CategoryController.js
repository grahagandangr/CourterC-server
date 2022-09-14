const { Category } = require("../models");

module.exports = class CategoryController {
  static async getCategory(req, res, next) {
    try {
      const category = await Category.findAll();

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
};
