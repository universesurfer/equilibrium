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
//       { "companyName" : "eileen-fisher" },
//       { $set: {"logo": "https://i.imgur.com/Ol9RFgK.png"}
//    });
 //
//  db.companies.updateOne(
//        { "companyName" : "saltura" },
//        { $set: {"about": "All of Saltura's products are designed, sourced, and manufactured along a 90-mile stretch of the Cali coast. Their sustainably-made tees and button-downs are a mix of hemp and organic cotton, with some of the softest cotton you’ve ever worn. Source local, support local."
// }});

// );

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
