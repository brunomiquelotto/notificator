var express = require("express");
var router = express.Router();

const database = require("../database");
database.connect();

const { Account } = require('../models');

/* GET users listing. */
router.get("/", async function (req, res) {
  var accounts = await Account.find().lean();
  res.send(accounts);
});

router.post("/", async function (req, res) {
  var account = new Account({
    name: req.body.name,
    adminEmail: req.body.email,
  });
  await account.save();
  res.status(201).send(account);
});

router.put("/:id", async function (req, res, next) {
  var account = await Account.findOne({ _id: req.params.id });
  if (!account) {
    return next();
  }
  //TODO: update data

  return res.send(account);
});

router.delete("/:id", async function (req, res, next) {
  var user = await Account.findOne({ _id: req.params.id });
  if (!user) {
    return next();
  }

  await user.remove();
  return res.status(204).end();
});

router.get("/:id", async function (req, res, next) {
  var account = await Account.findOne({ _id: req.params.id }).lean();
  if (!account) {
    return next();
  }

  return res.send(account);
});

module.exports = router;
