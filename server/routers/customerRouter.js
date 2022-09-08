const UserController = require("../controllers/UserController");
const CartListController = require("../controllers/CartListController");

const authentication = require("../middlewares/authentication");

const customerRouter = require("express").Router();

customerRouter.post("/login", UserController.login);
customerRouter.post("/register", UserController.register);

customerRouter.post("/cartList", CartListController.create);
customerRouter.get("/cartList/:userId", CartListController.getData);
customerRouter.delete("/cartList/:cartId", CartListController.delete);
customerRouter.use(authentication);


module.exports = customerRouter;
