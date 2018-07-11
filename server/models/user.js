const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  image: Object,
  aboutText: String,
  reviews: [ { type: Schema.Types.ObjectId, ref: "Review" } ]
  // role: {
  //   admin: Boolean,
  //   user: Boolean
  // }

});

const User = mongoose.model("User", userSchema);
module.exports = User;
