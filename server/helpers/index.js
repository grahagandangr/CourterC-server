const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const compareHash = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

const createToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET);

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  hashPassword,
  compareHash,
  createToken,
  verifyToken,
};
