const { hashPassword, compareHash, createToken } = require("../helpers");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, role, address } =
        req.body;
      console.log(req.body, "====");

      let userLocation = {
        type: "Point",
        coordinates: [0, 0],
      };

      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        role,
        address,
        balance: 0,
        location: userLocation,
      });

      res.status(201).json({
        message: `Success register`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async registerOwner(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      let userLocation = {
        type: "POINT",
        coordinates: [0, 0],
      };

      if (!email || !password) {
        throw { name: "Email/Password is required" };
      }

      const user = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
        balance: 0,
        location: userLocation,
      });

      const login = await User.findOne({
        where: {
          email: user.email,
        },
      });
      if (!login) throw { name: "Invalid_email/password" };
      const comparePass = compareHash(password, login.password);

      if (!comparePass) throw { name: "Invalid_email/password" };

      const payload = {
        id: login.id,
      };

      const access_token = createToken(payload);
console.log(access_token);
      res.status(201).json({
        message: "success register owner",
        access_token,
        username: login.username,
        id: login.id,
        role: login.role
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "Email/Password is required" };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "Invalid_email/password" };
      }

      const comparePass = compareHash(password, user.password);

      if (!comparePass) {
        throw { name: "Invalid_email/password" };
      }

      const payload = {
        id: user.id,
      };

      const access_token = createToken(payload);

      const username = user.username;
      const id = user.id;
      const role = user.role;
      res.status(200).json({
        access_token,
        username,
        id,
        role,
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async getUserDetail(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
