const PaymentController = require("../controllers/PaymentController");
const UserController = require("../controllers/UserController");

const authentication = require("../middlewares/authentication");

const customerRouter = require("express").Router();

customerRouter.post("/login", UserController.login);
customerRouter.post("/register", UserController.register);

customerRouter.use(authentication)
customerRouter.get('/', (req, res) => res.send('masuk authen cussss'))
customerRouter.post("/top-up", PaymentController.topUpBalance);
customerRouter.post('/top-up/update-balance', PaymentController.updateBalance)
customerRouter.post('/do-payment', PaymentController.doPayment)


customerRouter.use(authentication);

module.exports = customerRouter;
