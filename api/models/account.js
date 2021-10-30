const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
    { name: String, adminEmail: String },
    { collection: "accounts" }
  );
  
const Account = mongoose.model("account", accountSchema);

module.exports = Account;