const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema ({

  companyName: String,
  userRatings: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rating: Number
  }],
  averageRating: Number,
  numberOfRatings: Number
});


const Company = mongoose.model("Company", companySchema);
module.exports = Company;
