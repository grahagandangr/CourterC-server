const CourtCategoryController = require("../controllers/CourtCategoryController");
const CourtController = require("../controllers/CourtController");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const OrderScheduleController = require('../controllers/OrderScheduleController')
const ownerRouter = require("express").Router();


ownerRouter.post("/register", UserController.register); //done
ownerRouter.post("/login", UserController.login); //done

ownerRouter.use(authentication)
ownerRouter.get('/courts-orderLists', OrderScheduleController.getOrderOwner) //ini untuk dapat order list si owner

ownerRouter.get('/courtCategories/:id', CourtCategoryController.getDetail)
ownerRouter.put('/courtCategories/:id', CourtCategoryController.updateCourtCategory)
ownerRouter.delete('/courtCategories/:id', CourtCategoryController.deleteCourtCategory)
ownerRouter.post('/courtCategories', CourtCategoryController.createCourtCategory)

ownerRouter.get('/', CourtController.getAll)
// ownerRouter.get('/:id', CourtController.getDetail)
ownerRouter.post('/', CourtController.createCourt)


module.exports = ownerRouter;
