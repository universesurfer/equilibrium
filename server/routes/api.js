const express = require("express");
const session = require("express-session");
let router = express.Router();

const User = require('../models/user');
const Company = require('../models/company');
const Review = require('../models/review');
const mongoose = require("mongoose");
const upload = require('../config/multer');





// GET api listing
router.get('/', (req, res) => {
  res.send('api works');
});


// router.get('/profile/:id', (req, res) => {
//   console.log("Getting a user from the database");
//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ message: 'Specified id is not valid' });
//   }
//
//   User.findById(req.params.id, (err, user) => {
//     if (err) {
//       return res.send(err);
//     } else {
//       return res.json(user);
//     }
//   });
// });


//EDIT USER PROFILE
router.put('/profile/:id', (req, res) => {

// console.log("Checking out file in route", req.file);

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid.' });
  }

  User.findByIdAndUpdate(req.params.id, {
    aboutText: req.body.aboutText
  }, (err, user, aboutText) => {
    if (err) {
      return res.send(err);
    } else {

      res.json({
        message: "Getting the aboutText req.body " + req.body.aboutText,
        user: user,
        aboutText: aboutText
      });
    }
  });
});

// var uploadFile = upload.fields({ name: 'file', maxCount: 1 });

// NOTE: may be getting 500 error due to user in DB not yet having image property?
router.post('/profile/:id', upload.single('file'), (req, res, next) => {

    console.log("Checking out file in route", req.file);

  var id = req.params.id;

  let image = req.file;


  User.findByIdAndUpdate(id, {
    image: image
  }, (err, user, image) => {

    if (err) {
      next(err);
    } else {
      res.json({
        user: "Getting the user in image update" + user,
        file: "Here's the image file" + image
      });
    }

  });
});


//Get user profile
router.get('/profile/:id', (req, res, next) => {


      res.json({
        user: "Getting the user profile"
      });


});







router.put('/:category', (req, res) => {

  res.json({
    category: req.params,
    user: req.body
  });


});

router.get('/:category', (req, res) => {
  Company.find({ "category": req.params.category }, (err, companies) => {
    if (!companies) {
      res.status(400).json({ message: "Can't find any companies in this category or they don't exist yet." });
    } else {

      return res.json({
        message: "getting companies!",
        companies: companies,
        paramCheck: req.params.category
      });
  }
});
});




//Retrieve all the reviews for the company and populate
router.get('/:category/:company', (req, res, next) => {

  Company.findOne({ "companyName": req.params.company}, (err, company) => {

    console.log("printing all reviews", company.reviews);

    if(!company) {
      res.status(400).json({ message: "Can't find the company you're looking for at the moment." });
    } else {

          Review.find({'_id': { $in: company.reviews } },
             (err, reviews) => {
             console.log("getting all reviews for company", reviews);

             res.json({
               message: "Retrieving your company",
               company: company,
               reviews: reviews
             });

        });

    }

  });
});

// NOTE: unset property from mongodb
// db.companies.update(
//    { $unset: { reviews: "" } }
// )





router.post('/:category/:company', (req, res, next) => {

  var companyName;
  var companyId;
  var subject = req.body.subject;
  var commentBody = req.body.commentBody;
  var starRating = req.body.starRating;
  var createdBy = req.body.createdBy;


  if(!subject || !commentBody || !starRating) {
    res.status(400).json({ message: "Subject, comment body, and star rating are required." });
    return;
  }

  var newReview = Review({
    companyName,
    companyId,
    starRating,
    subject,
    commentBody,
    createdBy
  });

  Company.findOne({"companyName": req.params.company}, (err, company) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      this.companyName = company.companyName;
      this.companyId = company.id;
    }
  });

         newReview.save((err, review) => {

              if (err) {
                return res.status(400).json({ message: err });
              } else { User.findByIdAndUpdate({_id: createdBy },{$push: {reviews: review._id} }, (err) => {
                  if (err) {
                    console.log("There was an error pushing review to user");
                    next(err);
                  } else {  Company.findOneAndUpdate({ "companyName": req.params.company}, {$push: {reviews: review._id}}, (err, company) => {
                      if (err) {
                        console.log("There was an error pushing review to company");
                        next(err);
                      } else {

                        //Sets companyId and companyName properties to review for Mongo
                        Review.update({_id: review._id}, {$set: {companyId: this.companyId, companyName: this.companyName}}, (err, changes) => {
                          if(err) {
                            return res.status(400).json({message : err});
                          } else {
                            console.log("updating review successfully with company info", changes);
                          }
                        });

                        console.log ("Review successfully saved");

                        res.json({
                          review: review,
                        });


            // NOTE: would populate be used here to display the changes immediately after submission?
              // Review.findOne({_id: review.id})
              // .populate("companyId", company.id)
              // .populate("createdBy", userId)
              // .exec((err, review) => {
              //   if (err) {
              //     next(err);
              //     return;
              //   }
              //   res.json(review);
              //   // res.render('dashboard/profile', {review, booking, users});
              // });

            }
          });

        }
      });

    }


});
});
//
//
// router.post('/', (req, res, next) => {
//   console.log(req)
//   var  rating = req.body.rating;
//   var	 evaluation = req.body.evaluation;
//   var	 subject = req.body.subject;
//   var  customer = req.body.customer;
//   var  helper = req.body.helper;
//   var  booking = req.body.booking;
//
//   var newReview = Review({
//     rating,
//     evaluation,
//     subject,
//     booking,
//     customer,
//     helper
//   });
//
//   console.log(newReview)
//   newReview.save((err, review) => {
//     if (err) {
//       req.flash('error', 'Unable to save');
//       res.render("auth/signup", {
//         message: req.flash('error')
//       });
//     } else { User.findByIdAndUpdate({_id: customer},{$push: { reviews: review.id }}, (err) => {
//       if (err) {
//         console.log("GOT AN ERROR");
//         next(err);
//       } else {  User.findByIdAndUpdate({_id: helper},{$push: { reviews: review.id,}}, (err) => {
//         if (err) {
//           console.log("GOT AN ERROR");
//           next(err);
//         } else {  Booking.findByIdAndUpdate({_id: booking},{$push: { reviews: review.id,}}, (err) => {
//           if (err) {
//             console.log("GOT AN booking eror");
//             next(err);
//           }
//         else {
//           User
//           .findOne({_id: req.body.customer})
//           .populate("bookings")
//           .exec((err, users) => {
//             if (err) {
//               next(err);
//               return;
//             }
//
//             Booking
//             .find({customer: req.body.customer})
//             .populate("helper")
//             .exec((err, booking) => {
//               if (err) {
//                 next(err);
//                 return;
//               }
//
//               Review
//               .findOne({_id: review.id})
//               .populate("customer")
//               .populate("helper")
//               .exec((err, review) => {
//                 if (err) {
//                   next(err);
//                   return;
//                 }
//                 res.json(review);
//                 // res.render('dashboard/profile', {review, booking, users});
//               });
//             });
//           })
//           ;}
//         });
//       }
//           });
//         }
//     });
//   }
// });


//
// router.post('/signup', (req, res, next) => {
//   var email = req.body.email;
//   var password = req.body.password;
//
//   if (!email || !password) {
//     res.status(400).json({message: "Both email and password are required"});
//     return;
//   }
//
//   User.findOne({ email }, "email", (err, user) => {
//     if (user !== null) {
//       res.status(400).json({ message: 'Email exists already' });
//       return;
//     }
//
//     var salt = bcrypt.genSaltSync(bcryptSalt);
//     var hashPass = bcrypt.hashSync(password, salt);
//
//     var newUser = User({
//       email,
//       password: hashPass
//     });
//
//     newUser.save((err, user) => {
//       if (err) {
//         res.status(400).json({ message: err });
//       } else {
//         var payload = {id: user._id};
//         console.log('user', user);
//         var token = jwt.sign(payload, jwtOptions.secretOrKey);
//
//         res.status(200).json({ message: 'ok', token: token});
//       }
//     });
//
//   });
// });
//
//







module.exports = router;
