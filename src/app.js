require("dotenv").config();

const express = require("express");
const httpStatus = require("http-status");
const cors = require("cors");

const router = require("./routes/transaction.routes");
const ApiError = require("./utils/ApiError");
const { errorHandler } = require("./middlewares/error.middleware");
const { initializeDatabase } = require("./controllers/transaction.controller");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// // gzip compression
// app.use(compression());

app.use(cors());
app.options("*", cors());

// initialization of DataBase
(async () => {
  try {
    initializeDatabase();
    console.log('Database initialized on startup');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
})();

app.use("/api", router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// handle error
app.use(errorHandler);

module.exports = app;