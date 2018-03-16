const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema ({

  companyName: String,
  website: String,
  logo: String,
  about: String,
  basedIn: String,
  materialOrigins: [String],
  productRange: [String],
  category: String,
  reviews: [ {type: Schema.Types.ObjectId, ref: 'Review'} ],
  // socialImpactRating: Number,
  // environmentalRating: Number,
  // transparencyRating: Number,
  certifications: {
    bCorp: Boolean
  },
  // bCorp: Boolean,
  priceRange: Number

  // NOTE: I can probably do average rating and number of rating after database call and not store it directly.  Probably should but don't know about speed yet.
  // NOTE: include 'conclusion' that provides brief overall analysis of company impact on sustainability & social impact.
  // NOTE: Only include companies that meet highest criteria of environmental/social impact?
});


const Company = mongoose.model("Company", companySchema);
module.exports = Company;

// db.products.insertMany( [
//       { item: "card", qty: 15 },
//       { item: "envelope", qty: 20 },
//       { item: "stamps" , qty: 30 }
//    ] );


// db.companies.updateOne(
//       { "companyName" : "everlane" },
//       { $set: {"category": ["women-apparel", "men-apparel"]} }
//    );

 // db.companies.updateOne(
 //       { "companyName" : "nau" },
 //       { $set: {"logo": "https://i.imgur.com/1CFtY48.jpg"} }
 //    );
