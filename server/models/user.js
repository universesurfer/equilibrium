const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  email: String,
  firstName: String,
  lastName: String,
  password: String

});

const User = mongoose.model("User", userSchema);
module.exports = User;
