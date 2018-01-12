const express = require("express");
const session = require("express-session");
let router = express.Router();

const User = require('../models/user');
const Company = require('../models/company');
const mongoose = require("mongoose");


// let sesh;
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

router.get('/:category/:company', (req, res) => {

  Company.findOne({ "companyName": req.params.company}, (err, company) => {
    if(!company) {
      res.status(400).json({ message: "Can't find the company you're looking for at the moment." });
    } else {

      return res.json({
        message: "Retrieving your company",
        company: company
      });

    }

  });
});









module.exports = router;
