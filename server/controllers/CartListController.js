const { CartList } = require("../models");

class CartListController {
  static async getData(req, res, next) {
    try {
      const { id } = req.params;
      const cartList = await CartList.findOne({ where: { id } });

      res.status(200).json(cartList);
    } catch (error) {
      console.log(error);
    }
  }
  static async create(req, res, next) {
    try {
      const cartList = await CartList.create({
        UserId: 1,
        date: new Date(),
        CourtCategoryId: 1,
      });

      res.status(201).json(cartList);
    } catch (error) {
      console.log(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { cartId: id } = req.params;

      await CartList.destroy({ where: { id } });

      res.status(200).json({
        msg: "Success delete cartList",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CartListController;
