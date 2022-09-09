const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");

const ownerRouter = require("express").Router();


ownerRouter.post("/register", UserController.register);
ownerRouter.post("/login", UserController.login);

ownerRouter.use(authentication)



module.exports = ownerRouter;
