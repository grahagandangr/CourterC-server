const { Court, User } = require("../models");

module.exports = class CourtController {
  static async getCourt(req, res, next) {
    try {
      const id = req.user.id;
      const court = await Court.findAll({
        where: { UserId: id },
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
      
      const { name, description, openHour, closeHour, location, address } =
        req.body;

      const lat = location[0];

      const long = location[1];

      const point = { type: "POINT", coordinates: [lat, long] };

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
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
