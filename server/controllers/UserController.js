const { hashPassword, compareHash, createToken } = require("../helpers");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, role, address} =
        req.body;
        console.log(req.body, '====');

        let userLocation = {
          type: "Point",
          coordinates: [0, 0],
        };

      if (!password) {
        throw { name: "Password is required" };
      }

      const newUser = await User.create({
        username,
        email,
        password: hashPassword(password),
        phoneNumber,
        role,
        address,
        balance: 0,
        location: userLocation,
      });

      res.status(201).json({
        message: `new user is created`,
      });
    } catch (error) {
      console.log(error);
      res.send(error)
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
      res.status(200).json({
        access_token,
        username,
        id,
      });
    } catch (error) {
        res.send(error)
      console.log(error);
    }
  }

}

module.exports = UserController;

