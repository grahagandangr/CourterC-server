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
      next(error);
      console.log(error);
    }
  }

  static async getCourtCustomer(req, res, next) {
    try {
      const court = await Court.findAll();

      res.status(200).json(court);
    } catch (error) {
      next(error);
      console.log(error);
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
      next(error)
      console.log(error);
    }
  }

  // static async updateCourt(req, res, next) {
  //   const { name, description, UserId, openHour, closeHour, location } =
  //     req.body;

  //   const { id } = req.params;

  //   const lat = location[0];

  //   const long = location[1];

  //   const point = { type: "POINT", coordinates: [lat, long] };

  //   try {
  //     const findCourt = await Court.findByPk(id);

  //     if (!findCourt) throw { name: "Not Found" };

  //     const court = await Court.update(
  //       { name, description, UserId, openHour, closeHour, location: point },
  //       {
  //         where: {
  //           id: findCourt.id,
  //         },
  //       }
  //     );

  //     res.status(200).json({
  //       message: "court updated",
  //       court,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // static async deleteCourt(req, res, next) {
  //   const { id } = req.params;

  //   try {
  //     const findCourt = await Court.findByPk(id);

  //     if (!findCourt) throw { name: "Not Found" };

  //     await Court.destroy({
  //       where: {
  //         id: findCourt.id,
  //       },
  //     });

  //     res.status(200).json({
  //       message: "success delete court",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
};
