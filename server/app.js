if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const router = require('./routers');

const cors = require('cors');
const errorHandlers = require('./middlewares/errorHandlers');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use('/uploads', express.static('./uploads'));
app.use(errorHandlers);

module.exports = app;
