const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  avatar: String,
  aboutText: String,
  ratings: [{
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    rating: Number
  }]
  // comments: { type: Schema.Types.ObjectId, ref: 'Comment' }

});

const User = mongoose.model("User", userSchema);
module.exports = User;
