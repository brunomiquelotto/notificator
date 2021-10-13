var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/notifications");

const notificationSchema = new mongoose.Schema(
  {
    identificator: String,
    default_title: String,
    default_description: String,
    account_id: String,
    type: String,
  },
  { collection: "notifications" }
);

const Notification = mongoose.model("notification", notificationSchema);

/* GET users listing. */
router.get("/", async function (req, res) {
  var accountId = req.headers.account_id;
  var accounts = await Notification.find({ account_id: accountId });
  res.send(accounts);
});

router.post("/", async function (req, res) {
  var notification = new Notification({
    identificator: req.body.identificator,
    default_title: req.body.defaultTitle,
    default_description: req.body.defaultDescription,
    account_id: req.headers.account_id,
    type: req.body.type,
  });

  var existingNotification = await Notification.findOne({
    identificator: req.body.identificator,
    type: req.body.type,
  });

  if (existingNotification) {
    return res.status(409).send({ message: "Notification.Already.Exists" });
  }

  await notification.save();
  res.status(201).send(notification);
});

router.put("/:id", async function (req, res, next) {
  var notification = await Notification.findOne({ _id: req.params.id });
  if (!notification) {
    return next();
  }
  //todo: implement
  return res.send(notification);
});

router.delete("/:id", async function (req, res, next) {
  var notification = await Notification.findOne({
    _id: req.params.id,
    account_id: req.headers.account_id,
  });
  if (!notification) {
    return next();
  }

  await notification.remove();
  return res.status(204).end();
});

router.get("/:id", async function (req, res, next) {
  var notification = await Notification.findOne({
    _id: req.params.id,
    account_id: req.headers.account_id,
  });
  if (!notification) {
    return next();
  }

  return res.send(notification);
});

module.exports = router;
