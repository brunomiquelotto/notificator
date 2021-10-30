var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const { User } = require('../models');

mongoose.connect("mongodb://localhost:27017/notifications");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  var users = await User.find({ accountId: req.headers['account-id'] });
  res.send(users);
});

router.post("/", async function (req, res, next) {
  var user = new User({ name: req.body.name, email: req.body.email, accountId: req.headers['account-id'] });
  await user.save();
  res.status(201).send(user);
});

router.put("/:id", async function (req, res, next) {
  var user = await User.findOne({ _id: req.params.id, accountId: req.headers['account-id'] });
  if (!user) {
    return res.status(404).end();
  }

  return res.send(user);
});

router.delete("/:id", async function (req, res, next) {
  var user = await User.findOne({ _id: req.params.id, accountId: req.headers['account-id'] });
  if (!user) {
    return res.status(404).end();
  }

  await user.remove();
  return res.status(204).end();
});

router.get("/:id", async function (req, res) {
  var user = await User.findOne({ _id: req.params.id, accountId: req.headers['account-id'] });
  if (!user) {
    return res.status(404).end();
  }

  return res.send(user);
});

module.exports = router;
