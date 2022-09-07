const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");

const adminRouter = require("express").Router();


adminRouter.post("/register", UserController.register);
adminRouter.post("/login", UserController.login);

adminRouter.use(authentication)



module.exports = adminRouter;
