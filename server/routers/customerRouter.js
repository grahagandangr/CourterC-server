const UserController = require("../controllers/UserController");

const customerRouter = require("express").Router();


customerRouter.post("/login", UserController.login);
customerRouter.post("/register", UserController.register);


module.exports = customerRouter;
