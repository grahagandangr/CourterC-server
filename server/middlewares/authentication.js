const { verifyToken } = require("../helpers");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw {
        name: "NoToken",
      };
    }

    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw {
        name: "JsonWebTokenError",
      };
    }

    console.log(payload, "dari authen======");

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = authentication