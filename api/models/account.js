const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      adminEmail: { type: String, required: true },
    },
    { collection: "accounts" }
  );
  
accountSchema.index({ adminEmail: 1 }, { unique: true });

const Account = mongoose.model("account", accountSchema);

module.exports = Account;