const CourtController = require("../controllers/CourtController");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");

const ownerRouter = require("express").Router();


ownerRouter.post("/register", UserController.register);
ownerRouter.post("/login", UserController.login);

ownerRouter.use(authentication)

ownerRouter.get('/', CourtController.getAll)
// ownerRouter.get('/:id', CourtController.getDetail)
// ownerRouter.post('/', CourtController.createCourt)
// ownerRouter.put('/:id', CourtController.updateCourt)
// ownerRouter.delete('/:id', CourtController.deleteCourt)





module.exports = ownerRouter;
