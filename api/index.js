const express = require("express");
const createError = require("http-errors");
const app = express();
const logger = require("morgan");

const router = express.Router();

router.use(function (req, res, next) {
  console.log("/" + req.method + " " + req.url);
  next();
});

router.get("/", function (req, res) {
  res.send("Welcome");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded());

var usersRouter = require("./routes/users");
app.use("/users", usersRouter);

var accountsRouter = require("./routes/accounts");
app.use("/accounts", accountsRouter);

var notificationRouter = require("./routes/notifications");
app.use("/notifications", notificationRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
