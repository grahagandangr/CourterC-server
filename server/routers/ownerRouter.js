const CourtCategoryController = require("../controllers/CourtCategoryController");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");

const ownerRouter = require("express").Router();


ownerRouter.post("/register", UserController.register);
ownerRouter.post("/login", UserController.login);

// ownerRouter.use(authentication)

ownerRouter.get('/courtCategories/:id', CourtCategoryController.getDetail)
ownerRouter.put('/courtCategories/:id', CourtCategoryController.updateCourtCategory)
ownerRouter.delete('/courtCategories/:id', CourtCategoryController.deleteCourtCategory)
ownerRouter.post('/courtCategories', CourtCategoryController.createCourtCategory)







module.exports = ownerRouter;
