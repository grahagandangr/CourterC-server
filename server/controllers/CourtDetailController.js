const {
  Court,
  CourtCategory,
  Category,
  Schedule,
  OrderDetail,
  User,
} = require("../models");

class Controller {
  static async getDetailCourt(req, res, next) {
    try {
      const { id } = req.params;
      const { date } = req.query;
      console.log(date, "<<<<<<<<<<");
      const courtDetail = await CourtCategory.findOne({
        where: { id },
        include: [
          {
            model: Court,
            include:[User],
          },
          {
            model: Category,
          },
        ],
      });

      const schedules = await Schedule.findAll();
      const openHour = courtDetail.Court.openHour;
      const closeHour = courtDetail.Court.closeHour;
      let filteredSchedules = schedules.filter(
        (e) => e.id >= openHour && e.id < closeHour
      );

      let bookedSchedule = await OrderDetail.findAll({
        where: { CourtCategoryId: id, date: date },
      });
      res.status(200).json({ courtDetail, filteredSchedules, bookedSchedule });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = Controller;
