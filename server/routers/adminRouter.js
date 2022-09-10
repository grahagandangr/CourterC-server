const UserController = require("../controllers/UserController");

const adminRouter = require("express").Router();


adminRouter.post("/login", UserController.login);
adminRouter.post("/register", UserController.register);


module.exports = adminRouter;
