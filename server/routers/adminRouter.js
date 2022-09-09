const authentication = require("../middlewares/authentication");

const adminRouter = require("express").Router();



adminRouter.use(authentication)



module.exports = adminRouter;
