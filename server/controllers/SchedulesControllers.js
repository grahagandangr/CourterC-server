const { Schedule } = require("../models");

class Controller {
  static async getSchedules(req, res, next) {
    try {
      const schedules = await Schedule.findAll();
      //   const openHour = 7;
      //   const closeHour = 15;
      //   let filteredSchedules = schedules.filter(
      //     (e) => e.id >= openHour && e.id < closeHour
      //   );
      res.status(200).json(schedules);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Controller;
