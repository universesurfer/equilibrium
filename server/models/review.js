const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({

  companyName: String,
  companyId: { type: Schema.Types.ObjectId, ref: 'Company'},
  starRating: Number,
  subject: String,
  commentBody: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User'},

});

reviewSchema.set('timestamps', true);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;



// NOTE: unset property from mongodb
// db.companies.update(
//    { $unset: { reviews: "" } }
// )
