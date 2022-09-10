const PaymentController = require("../controllers/PaymentController");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const customerRouter = require("express").Router();

customerRouter.post("/login", UserController.login);
customerRouter.post("/register", UserController.register);
customerRouter.post("/payment", PaymentController.midtransPayment);

customerRouter.use(authentication);

module.exports = customerRouter;
