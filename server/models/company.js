const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema ({

  name: String,
  averageRating: Number,
  numberOfRatings: Number

});


const Company = mongoose.model("Company", companySchema);
module.exports = Company;
