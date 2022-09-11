if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routers");

const cors = require("cors");
const errorHandlers = require("./middlewares/errorHandlers");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandlers)

module.exports = app

  // app.listen(port, () => {
  //   console.log(`App listening on port ${port}`);
  // });
