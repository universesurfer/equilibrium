const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({

  starRating: Number,
  subject: String,
  commentBody: String,
  user: { type: Schema.Types.ObjectId, ref: 'User'}

});


const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
