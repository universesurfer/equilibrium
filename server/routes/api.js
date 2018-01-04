const express = require("express");
const session = require("express-session");
let router = express.Router();

const User = require('../models/user');
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
        message: "Getting the aboutText req.body " + req.body.aboutText,     //req.body returns the full user object.  req.body.aboutText should work
        user: user,
        aboutText: aboutText
      });
    }
  });

});








module.exports = router;
