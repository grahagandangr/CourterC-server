const { User, Order, OrderDetail, CourtCategory, Court, Category, Schedule } = require("../models");
class Controller {
  static async payOrders(req, res, next) {
    try {
      const UserId = req.user.id;
      const data = req.body;
      // console.log(data);
      // console.log(data.cart);
      // data isinya totalprice, courtCategoryId yg didapat dari asyncStorage

      // const cartList = [
      //   {
      //     date: new Date(),
      //     price: 50000,
      //     status: "Reserved",
      //     CourtCategoryId: 1,
      //     ScheduleId: 8,
      //   },
      //   {
      //     date: new Date(),
      //     price: 20000,
      //     status: "Reserved",
      //     CourtCategoryId: 1,
      //     ScheduleId: 9,
      //   },
      // ];
      // let totalPrice = 0;
      // cartList.forEach((e) => (totalPrice += e.price));
      // console.log(totalPrice);

      const order = await Order.create({
        CourtCategoryId: data.cart[0].CourtCategoryId,
        totalPrice: data.totalPrice,
        UserId,
      });

      console.log(order, "======");
      for (const item of data.cart) {
        await OrderDetail.create({
          date: item.date,
          price: item.price,
          status: data.status,
          CourtCategoryId: item.CourtCategoryId,
          OrderId: order.id,
          ScheduleId: item.ScheduleId,
        });
      }

      const user = await User.findByPk(UserId);

      if (user.balance < data.totalPrice) {
        throw { name: "your balance is not enough" };
      }
      const userBalance = await User.update(
        {
          balance: user.balance - Number(data.totalPrice),
        },
        {
          where: { id: UserId },
        }
      );
      res.status(200).json({
        message: "success order",
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async getOrder(req, res, next) {
    try {
      const UserId = req.user.id;
      const order = await Order.findAll({
        where: { UserId },
        include: { all: true, nested: true },
      });

      const schedule = await Schedule.findAll();
      res.status(200).json({ order, schedule });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async getOrderOwner(req, res, next) {
    try {
      const ownerId = req.user.id;
      const order = await Order.findAll({
        include: [
          {
            model: CourtCategory, 
            include: [
              {
                model: Court,
                include: {
                  model: User,
                },
              },
              {
                model: Category,
              },
            ],
          },
          {
            model: OrderDetail,
          },
          {
            model: User
          }

        ],
      });
      const schedule = await Schedule.findAll();
      // const user = order.map(e=> e.CourtCategory.Court.User)
      const owner = order.filter((e) => e.CourtCategory.Court.User.id === ownerId);
      const ownerOrders = owner.map((e) => {
        return {
          name: e.CourtCategory.Court.name + "-" + e.CourtCategory.Category.name,
          totalPrice: e.totalPrice,
          orderDetails: e.OrderDetails,
          customer: e.User
        };
      });

      res.status(200).json({ownerOrders, schedule});
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}
module.exports = Controller;
