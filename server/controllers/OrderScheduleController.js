const { Order, OrderDetail } = require("../models");
class Controller {
  static async OrderSchedule(req, res, next) {
    try {
      const cartList = [
        {
          date: new Date(),
          price: 50000,
          status: "Reserved",
          CourtCategoryId: 1,
          ScheduleId: 8,
          UserId: 1,
        },
        {
          date: new Date(),
          price: 20000,
          status: "Reserved",
          CourtCategoryId: 1,
          ScheduleId: 9,
          UserId: 1,
        },
      ];
      let totalPrice = 0;
      cartList.forEach((e) => (totalPrice += e.price));
      console.log(totalPrice);
      const order = await Order.create({
        CourtCategoryId: cartList[0].CourtCategoryId,
        totalPrice,
        UserId: cartList[0].UserId,
      });
      for (const item of cartList) {
        await OrderDetail.create({
          date: new Date(),
          price: item.price,
          status: item.status,
          CourtCategoryId: item.CourtCategoryId,
          OrderId: order.id,
          ScheduleId: item.ScheduleId,
        });
      }
      res.status(201).json({
        msg: "success order",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getOrder(req, res, next) {
    try {
      const order = await Order.findAll({
        where: { UserId: 1 },
        include: [
          {
            model: OrderDetail,
          },
        ],
      });
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
    }
  }

  static async cancelOrder(req, res, next) {
    try {
      const order = await OrderDetail.update(
        { status: "Cancelled" },
        {
          where: { id: 5 },
        }
      );
      res.status(200).json({
        msg: "Success cancelled order",
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Controller;
