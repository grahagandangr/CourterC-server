const { Court, CourtCategory, Category, Schedule } = require("../models");

class Controller {
  static async getDetailCourt(req, res, next) {
    try {
      const { id } = req.params;
      const courtDetail = await CourtCategory.findOne({
        where: { id },
        include: [
          {
            model: Court,
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

      res.status(200).json({ courtDetail, filteredSchedules });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Controller;
