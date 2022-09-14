const CourtCategoryController = require("../controllers/CourtCategoryController");
const CourtController = require("../controllers/CourtController");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const OrderScheduleController = require("../controllers/OrderScheduleController");
const PaymentController = require("../controllers/PaymentController");
const CategoryController = require("../controllers/CategoryController");
const ownerRouter = require("express").Router();
const upload = require("../middlewares/multer");

ownerRouter.post("/register", UserController.registerOwner); //done
ownerRouter.post("/login", UserController.login); //done

ownerRouter.use(authentication);
ownerRouter.get("/courts", CourtController.getCourt); //done
ownerRouter.post("/courts", CourtController.createCourt); //done
ownerRouter.get("/categories", CategoryController.getCategory);
ownerRouter.get("/courtCategories", CourtCategoryController.getAllOwner); //done untuk data semua lapangan yg dimiliki owner
ownerRouter.get("/courtCategories/:id", CourtCategoryController.getDetail); //done
ownerRouter.post(
  "/courtCategories",
  upload.array("images", 5),

  CourtCategoryController.createCourtCategory
); //done

ownerRouter.get("/courts-orderLists", OrderScheduleController.getOrderOwner); //ini untuk dapat order list si owner
ownerRouter.patch(
  "/claimPayment/:orderDetailId",
  PaymentController.claimPaymentOwner
);

ownerRouter.get("/profile", UserController.getUserDetail); //done
module.exports = ownerRouter;
