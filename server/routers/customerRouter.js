const PaymentController = require("../controllers/PaymentController");
const UserController = require("../controllers/UserController");
const CourtDetailController = require("../controllers/CourtDetailController");
const OrderScheduleController = require("../controllers/OrderScheduleController");
const CourtCategoryController = require("../controllers/CourtCategoryController");
const CourtController = require("../controllers/CourtController");
const customerRouter = require("express").Router();
const authentication = require("../middlewares/authentication");

customerRouter.post("/login", UserController.login); //done
customerRouter.post("/register", UserController.register); //done

// customerRouter.get("/schedules", SchedulesControllers.getSchedules);
customerRouter.use(authentication);
customerRouter.get("/venues", CourtController.getCourtCustomer); //done, ini daftar GOR yg tersedia
// customerRouter.get("/venues/:id", CourtController.getDetail);
customerRouter.get('/courts', CourtCategoryController.getAllCustomer) //ini untuk tampilkan card lapangan di home page
customerRouter.get('/courts-radius', CourtCategoryController.getAllByRadius)
customerRouter.get("/courts/:id", CourtDetailController.getDetailCourt); //ini untuk menampilkan courtCategories detail dgn filtered schedule

customerRouter.get('/profile', UserController.getUserDetail) //done

customerRouter.post("/top-up", PaymentController.topUpBalance); //done
customerRouter.post("/top-up/update-balance", PaymentController.updateBalance); //done
customerRouter.post("/pay-orders", OrderScheduleController.payOrders); //done
customerRouter.get("/courts-orderList", OrderScheduleController.getOrder); //ini untuk cek semua order customer ====pr: cari semua order dari court untuk owner
customerRouter.patch("/courts/cancelOrder/:orderDetailId", PaymentController.cancelOrder);

module.exports = customerRouter;
