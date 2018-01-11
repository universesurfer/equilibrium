const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema ({

  companyName: String,
  category: String,
  reviews: [ {type: Schema.Types.ObjectId, ref: 'Review'} ],
  // NOTE: I can probably do average rating and number of rating after database call and not store it directly.  Probably should but don't know about speed yet.
});


const Company = mongoose.model("Company", companySchema);
module.exports = Company;

// db.products.insertMany( [
//       { item: "card", qty: 15 },
//       { item: "envelope", qty: 20 },
//       { item: "stamps" , qty: 30 }
//    ] );


// db.companies.updateOne(
//       { "companyName" : "nau" },
//       { $set: { "category" : "men-apparel" } }
//    );
