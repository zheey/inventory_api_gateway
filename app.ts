import * as dotenv from "dotenv";

dotenv.config();

import indexRouter from "./src/routes/index";
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Enable CORS from client side
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,GET,DELETE,POST,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept, Authorization, Apptoken," +
      " Access-Control-Allow-Credential"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.language = req.query.language || "en";
  res.langKey = req.query.langKey || false;
  global._language = res.language;

  next();
});

indexRouter(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  }
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
