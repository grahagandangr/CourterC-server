const {
  User,
  Order,
  OrderDetail,
  CourtCategory,
  Court,
  Category,
} = require("../models");
class Controller {
  static async payOrders(req, res, next) {
    try {
      const UserId = req.user.id;
      const cartList = [
        {
          date: new Date(),
          price: 50000,
          status: "Reserved",
          CourtCategoryId: 1,
          ScheduleId: 8,
        },
        {
          date: new Date(),
          price: 20000,
          status: "Reserved",
          CourtCategoryId: 1,
          ScheduleId: 9,
        },
      ];
      let totalPrice = 0;
      cartList.forEach((e) => (totalPrice += e.price));
      console.log(totalPrice);


      const order = await Order.create({
        CourtCategoryId: cartList[0].CourtCategoryId,
        totalPrice,
        UserId,
      });

      console.log(order, '======');
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

      const user = await User.findByPk(UserId);

      if(user.balance < totalPrice){
        throw  {name: 'your balance is not enough'}
      }
      const userBalance = await User.update(
        {
          balance: user.balance - Number(totalPrice),
        },
        {
          where: { id: UserId },
        }
      );
      res.status(200).json({
        message: "success order",
      });
    } catch (error) {
      next(error)
      console.log(error);
    }
  }

  static async getOrder(req, res, next) {
    try {
      const UserId = req.user.id;
      const order = await Order.findAll({
        where: { UserId },
        include: [
          {
            model: OrderDetail,
          },
        ],
      });
      res.status(200).json(order);
    } catch (error) {
      next(error)
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
        ],
      });

      // const user = order.map(e=> e.CourtCategory.Court.User)
      const owner = order.filter(
        (e) => e.CourtCategory.Court.User.id === ownerId
      );
      const ownerOrders = owner.map((e) => {
        console.log(e.OrderDetail);
        return {
          name:
            e.CourtCategory.Court.name + "-" + e.CourtCategory.Category.name,
          totalPrice: e.totalPrice,
          orderDetails: e.OrderDetails,
        };
      });

      res.status(200).json(ownerOrders);
    } catch (error) {
      next(error)
      console.log(error);
    }
  }
}
module.exports = Controller;
