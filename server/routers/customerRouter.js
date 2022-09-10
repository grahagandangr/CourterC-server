const PaymentController = require("../controllers/PaymentController");
const UserController = require("../controllers/UserController");
const SchedulesControllers = require("../controllers/SchedulesControllers");
const CourtDetailController = require("../controllers/CourtDetailController");
const OrderScheduleController = require("../controllers/OrderScheduleController");

const authentication = require("../middlewares/authentication");
const CourtCategoryController = require("../controllers/CourtCategoryController");
const CourtController = require("../controllers/CourtController");
const customerRouter = require("express").Router();
const authentication = require("../middlewares/authentication");

customerRouter.post("/login", UserController.login);
customerRouter.post("/register", UserController.register);

customerRouter.get("/schedules", SchedulesControllers.getSchedules);
customerRouter.get("/", CourtController.getAll);
// customerRouter.get("/:id", CourtController.getDetail);

customerRouter.use(authentication);
customerRouter.get("/", (req, res) => res.send("masuk authen cussss"));
customerRouter.post("/top-up", PaymentController.topUpBalance);
customerRouter.post("/top-up/update-balance", PaymentController.updateBalance);
customerRouter.post("/do-payment", PaymentController.doPayment);
customerRouter.post("/court/order", OrderScheduleController.OrderSchedule);
customerRouter.get("/court/orderList", OrderScheduleController.getOrder);
customerRouter.patch("/court/cancelOrder", PaymentController.cancelOrder);
customerRouter.get("/court/:id", CourtDetailController.getDetailCourt);

customerRouter.get('/court', CourtCategoryController.getAll)

// customerRouter.use(authentication);




module.exports = customerRouter;
