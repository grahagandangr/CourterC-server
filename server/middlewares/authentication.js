const { verifyToken } = require("../helpers");
const { User, Court } = require("../models");

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

    const court = await Court.findOne({
      where: { UserId: user.id },
    });

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    if (court) {
      req.user.CourtId = court.id;
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authentication;
