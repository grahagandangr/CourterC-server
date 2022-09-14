const { Court, User } = require("../models");

module.exports = class CourtController {
  static async getCourt(req, res, next) {
    try {
      const id = req.user.id;
      const court = await Court.findAll({
        where: { UserId: id },
        include: { all: true, nested: true }
      });

      res.status(200).json(court);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getCourtCustomer(req, res, next) {
    try {
      const court = await Court.findAll();

      res.status(200).json(court);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createCourt(req, res, next) {
    try {
      const id = req.user.id;
      console.log(0);
      let { name, description, openHour, closeHour, location, address } =
        req.body;
        console.log(location);
        const user = await User.findOne({where: {
          id:id
        }})


      const point = { type: "POINT", coordinates: location };
      const court = await Court.create({
        name,
        description,
        UserId: id,
        openHour,
        closeHour,
        location: point,
        address,
      });
      res.status(201).json({
        message: "success create court",
        id: court.id
      });
    } catch (error) {
      next(error);
    }
  }
};
