if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const router = require("./routers");

const cors = require("cors");
const errorHandlers = require("./middlewares/errorHandlers");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandlers);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening to ${port}`);
})
// module.exports = app

module.exports = app;

