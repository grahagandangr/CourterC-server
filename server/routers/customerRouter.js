const UserController = require("../controllers/UserController");
const SchedulesControllers = require("../controllers/SchedulesControllers");
const CourtDetailController = require("../controllers/CourtDetailController");
const OrderScheduleController = require("../controllers/OrderScheduleController");

const authentication = require("../middlewares/authentication");

const customerRouter = require("express").Router();

customerRouter.post("/login", UserController.login);
customerRouter.post("/register", UserController.register);
customerRouter.get("/schedules", SchedulesControllers.getSchedules);
customerRouter.post("/court/order", OrderScheduleController.OrderSchedule);
customerRouter.get("/court/orderList", OrderScheduleController.getOrder);
customerRouter.patch("/court/cancelOrder", OrderScheduleController.cancelOrder);
customerRouter.get("/court/:id", CourtDetailController.getDetailCourt);

// customerRouter.use(authentication);

module.exports = customerRouter;
