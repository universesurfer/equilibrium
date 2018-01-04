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
    aboutText: JSON.stringify(req.body)
  }, (err, user) => {
    if (err) {
      return res.send(err);
    } else {
      // console.log("here is the aboutText req", aboutText);
      res.json({
        message: 'User updated successfully',
        user: user
      });
    }
  });

});








module.exports = router;
