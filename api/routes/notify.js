var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/notifications");

const notificationSchema = new mongoose.Schema(
  {
    userId: String,
    notificationTypeId: String,
    params: Object,
    title: String,
    accountId: String,
    type: String,
    sentAt: Date
  },
  { collection: "notifications" }
);

const Notification = mongoose.model("notification", notificationSchema);

/* GET users listing. */
router.get("/", async function (req, res) {
  var accounts = await Notification.find({ account_id: req.headers['account-id'] });
  res.send(accounts);
});

router.post("/", async function (req, res) {
  var notification = new Notification({
    identificator: req.body.identificator,
    defaultTitle: req.body.defaultTitle,
    defaultDescription: req.body.defaultDescription,
    accountId: req.headers['account-id'],
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
  var notification = await Notification.findOne({ _id: req.params.id, account_id: req.headers['account-id'] });
  if (!notification) {
    return next();
  }

  notification.defaultTitle = req.body.defaultTitle;
  notification.defaultDescription = req.body.defaultDescription;
  notification.type = req.body.type;
  await notification.save();

  return res.send(notification);
});

router.delete("/:id", async function (req, res, next) {
  var notification = await Notification.findOne({
    _id: req.params.id,
    accountId: req.headers['account-id'],
  });
  if (!notification) {
    return next();
  }

  await notification.remove();
  return res.status(204).end();
});

router.get("/:id", async function (req, res, next) {
  var notification = await Notification.findOne({ _id: req.params.id, account_id: req.headers['account-id'] });

  if (!notification) {
    return next();
  }

  return res.send(notification);
});

module.exports = router;
