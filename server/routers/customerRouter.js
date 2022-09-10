const UserController = require("../controllers/UserController");
<<<<<<< HEAD
const CartListController = require("../controllers/CartListController");
=======
>>>>>>> seedingDummy

const authentication = require("../middlewares/authentication");

const customerRouter = require("express").Router();

customerRouter.post("/login", UserController.login);
customerRouter.post("/register", UserController.register);

<<<<<<< HEAD
customerRouter.post("/cartList", CartListController.create);
customerRouter.get("/cartList/:userId", CartListController.getData);
customerRouter.delete("/cartList/:cartId", CartListController.delete);
=======
>>>>>>> seedingDummy
customerRouter.use(authentication);


module.exports = customerRouter;
