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



//GET *PUBLIC* USER PROFILE
// NOTE: Move profile routes to separate file for refactor

router.get('/profile/:id', (req, res) => {
  console.log("Getting a user from the database");
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.send(err);
    } else {
      res.json({ user });
    }
  });
});



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
// router.get('/profile/:id', (req, res, next) => {
//
// // NOTE: most likely need to complete this route to successfully update user picture in real time
//
//       res.json({
//         user: "Getting the user profile"
//       });
//
//
// });


router.put('/:category', (req, res) => {

  res.json({
    category: req.params,
    user: req.body
  });


});

router.get('/:category', (req, res) => {
  Company.find({ category: {$in: req.params.category } }, (err, companies) => {
    if (!companies) {
      res.status(400).json({ message: "Can't find any companies in this category or they don't exist yet." });
    } else {

      res.send({
        message: "getting companies!",
        companies: companies,
        paramCheck: req.params.category
      });
}
});
});


//Delete the user's review on company profile page from all collections.
router.delete('/:category/:company/:reviewId/:userId', (req, res, next) => {

      Review.remove({ _id: req.params.reviewId}, (err) => {
        if (err) {
          res.status(400).json({ message: "Cannot delete review id in collection."});
        }
        else {
          Company.update({ "companyName": req.params.company}, {$pull: { reviews: req.params.reviewId } }, (err, changes) => {
            if (err) {
              return res.status(400).json({message: err});
            } else {
              User.update({ "_id": req.params.userId}, {$pull: { reviews: req.params.reviewId } }, (err, changes) => {
                if (err) {
                  return res.status(400).json({message: err});
                } else {
                  console.log("Removing review successfully from user and company review arrays", changes);
                }
              });
            }
          });
        }
      });
});



//Retrieve all the reviews for the company and populate
router.get('/:category/:company', (req, res, next) => {

  Company.findOne({ "companyName": req.params.company}, (err, company) => {

    // console.log("printing all reviews", company.reviews);

    if(!company) {
      res.status(400).json({ message: "Can't find the company you're looking for at the moment." });
    } else {

        Review.find({'_id': { $in: company.reviews }})
        .populate("createdBy")
        .exec((err, review) => {
          if (err) {
            next(err);
            return;
          } else {

            res.json({
                   message: "Retrieving your company",
                   company: company,
                   reviews: review
                 });

            console.log("returning review", review);
          }
        });

  }
});
});


router.post('/:category/:company', (req, res, next) => {

  var companyName;
  var companyId;
  // var subject = req.body.subject;
  var commentBody = req.body.commentBody;
  var starRating = req.body.starRating;
  var createdBy = req.body.createdBy;


  if(!commentBody || !starRating) {
    res.status(400).json({ message: "Subject, comment body, and star rating are required." });
    return;
  }

  var newReview = Review({
    companyName,
    companyId,
    starRating,
    // subject,
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

            }
          });
        }
      });

    }
});
});



module.exports = router;
