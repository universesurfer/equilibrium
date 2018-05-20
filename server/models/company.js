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
    bCorp: Boolean,
    fairTrade: Boolean,
    vegan: Boolean,
    organicCotton: Boolean
  },
  bestFor: {
    plusSize: Boolean,
    petite: Boolean,
    formalwear: Boolean,
    casual: Boolean,
    summerwear: Boolean,
    outdoors: Boolean,
    activewear: Boolean,
    winterwear: Boolean
  },
  priceRange: Number

});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;







// tentree, patagonia, everlane, nau, pact, amour-vert, reformation, eileen-fisher, tribe-alive, people-tree, united-by-blue, thought, hopemade, encircled


// db.products.insertMany( [
//       { item: "card", qty: 15 },
//       { item: "envelope", qty: 20 },
//       { item: "stamps" , qty: 30 }
//    ] );


// db.companies.updateOne(
//       { "companyName" : "nau" },
//       { $set: {"logo": "https://i.imgur.com/SY7cXH6.jpg", category: ["men-apparel", "women-apparel"]} }
//    );
 //
 // db.companies.updateOne(
 //       { "companyName" : "people-tree" },
 //       { $set: {"bestFor": {
 //         "casual": true,
 //         "summerwear": true,
 //         "activewear": true,
 //       }} }
 //    );

    // db.companies.insert(
    //     { companyName: "encircled", reviews : [], logo: "https://i.imgur.com/kci7ovg.png", category: ["men-apparel", "women-apparel"] }
    // );
    //
    // db.companies.deleteOne( { "_id" : ObjectId("5ace6b6f59938fb2e18c7609") } );

    // "_id" : ObjectId("5a5545a8f57a1e6f1ff342e6"),
    // 	"companyName" : "tribe-alive",
    // 	"reviews" : [
    // 		ObjectId("5acbfe06499ef421860ab432")
    // 	],
    // 	"logo" : "https://i.imgur.com/HwXvnyW.png",
    // 	"category" : "women-apparel"
