const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    { name: String, email: String, accountId: String },
    { collection: "users" }
);
  
const User = mongoose.model("user", userSchema);

module.exports = User;