const { sequelize } = require('../models');
const { CourtCategory, Image, Court, Category, User } = require('../models');
const { Op } = require('sequelize');
const upload = require('../middlewares/multer');
module.exports = class CourtCategoryController {
  static async getAllOwner(req, res, next) {
    try {
      const id = req.user.id;
      const courtCategory = await CourtCategory.findAll({
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
          {
            model: Image,
          },
        ],
      });

      const filter = courtCategory.filter((e) => e.Court.User.id === id);
      // console.log(filter[0].Images[0].imgUrl, '_')
      const courtCategoryFiltered = filter.map((e) => {
        return {
          id: e.id,
          name: e.Court.name + '-' + e.Category.name,
          address: e.Court.address,
          image: e.Images[0].imgUrl,
          price: e.price,
        };
      });

      res.status(200).json({
        courtCategoryFiltered,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllCustomer(req, res, next) {
    try {
      const id = req.user.id;
      const courtCategory = await CourtCategory.findAll({
        include: [
          {
            model: Court,
          },

          {
            model: Category,
          },
          {
            model: Image,
          },
        ],
      });

      const courtCategoryFiltered = courtCategory.map((e) => {
        return {
          id: e.id,
          name: e.Court.name + '-' + e.Category.name,
          address: e.Court.address,
          image: e.Images[0].imgUrl,
          price: e.price,
        };
      });

      res.status(200).json({
        courtCategoryFiltered,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllByRadius(req, res, next) {
    try {
      const distance = req.query.distance || 200000000000;
      const lat = req.query.lat || -6.25881;
      const long = req.query.long || 106.82932;

      let result = await sequelize.query(
        `select
        c.name, ca.name AS "CategoryName", i."imgUrl", c.address, cc.price, cc.id
        from
        "Courts" c
        JOIN "CourtCategories" cc ON c.id = cc."CourtId"
        JOIN "Categories" ca ON ca.id = cc."CategoryId" 
        JOIN "Images" i ON cc.id = i."CourtCategoryId" 
        where
          ST_DWithin(c.location,
            ST_MakePoint(:lat, :long),
            :distance,
            true) = true;`,
        {
          replacements: {
            distance: +distance,
            long: parseFloat(long),
            lat: parseFloat(lat),
          },
          logging: console.log,
          plain: false,
          raw: false,
          type: sequelize.QueryTypes.SELECT,
        }
      );
      console.log(result, '<<<<<<<<<<<<');

      const courtCategoryFiltered = result.map((e) => {
        return {
          id: e.id,
          Category: e.CategoryName,
          name: e.name + ' - ' + e.CategoryName,
          address: e.address,
          image: e.imgUrl,
          price: e.price,
        };
      });

      res.status(200).json({
        courtCategoryFiltered,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async createCourtCategory(req, res, next) {
    // console.log(req);
    const t = await sequelize.transaction();
    try {
      // console.log(req.images);
      const { CategoryId, price, imgUrl, CourtId } = req.body;
      const created = await CourtCategory.create(
        {
          CourtId,
          CategoryId,
          price,
        },
        { transaction: t }
      );
      // console.log(created);
      let arr = [];
      req.files.map((el) => {
        let obj = {
          imgUrl: el.path,
          CourtCategoryId: created.id,
        };
        arr.push(obj);
        return arr;
      });
      const images = await Image.bulkCreate(arr, { transaction: t });

      // const image = await Image.create(
      //   {
      //     CourtCategoryId: created.id,
      //     imgUrl: path,
      //   },
      //   { transaction: t }
      // );
      await t.commit();
      res.status(201).json({
        message: 'success create court category, image',
        created,
        images,
      });
    } catch (error) {
      console.log(error);
      next(error);
      await t.rollback();
    }
  }

  static async updateCourtCategory(req, res, next) {
    try {
      const { id } = req.params;

      const { CategoryId, price } = req.body;
      const courtCategory = await CourtCategory.update(
        { CategoryId, price },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: 'success updated',
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getDetail(req, res, next) {
    const { id } = req.params;

    try {
      const courtCategory = await CourtCategory.findOne({
        where: { id },
        include: [
          {
            model: Court,
          },
          {
            model: Category,
          },
          {
            model: Image,
          },
        ],
      });

      res.status(200).json({
        courtCategory,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteCourtCategory(req, res, next) {
    const { id } = req.params;

    try {
      await CourtCategory.destroy({
        where: { id },
      });

      res.status(200).json({
        message: 'success delete courtCategory',
      });
    } catch (error) {
      console.log(error);
    }
  }
};
