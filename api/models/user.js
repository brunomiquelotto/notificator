const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    { name: String, email: String, accountId: String },
    { collection: "users" }
);

userSchema.index({ email: 1, accountId: 1 }, { unique: true });
const User = mongoose.model("user", userSchema);

module.exports = User;