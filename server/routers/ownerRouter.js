const CourtCategoryController = require("../controllers/CourtCategoryController");
const CourtController = require("../controllers/CourtController");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const OrderScheduleController = require('../controllers/OrderScheduleController');
const PaymentController = require("../controllers/PaymentController");
const ownerRouter = require("express").Router();


ownerRouter.post("/register", UserController.register); //done
ownerRouter.post("/login", UserController.login); //done

ownerRouter.use(authentication)
ownerRouter.get('/courts', CourtController.getCourt) //done
ownerRouter.post('/courts', CourtController.createCourt) //done

ownerRouter.get('/courtCategories', CourtCategoryController.getAllOwner) //done untuk data semua lapangan yg dimiliki owner
ownerRouter.get('/courtCategories/:id', CourtCategoryController.getDetail) //done
ownerRouter.put('/courtCategories/:id', CourtCategoryController.updateCourtCategory) //done
ownerRouter.delete('/courtCategories/:id', CourtCategoryController.deleteCourtCategory) //done
ownerRouter.post('/courtCategories', CourtCategoryController.createCourtCategory)  //done

ownerRouter.get('/courts-orderLists', OrderScheduleController.getOrderOwner) //ini untuk dapat order list si owner
ownerRouter.patch('/claimPayment/:orderDetailId', PaymentController.claimPaymentOwner )

module.exports = ownerRouter;
