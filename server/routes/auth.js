const express = require("express");
const session = require("express-session");
let router = express.Router();
let jwt = require('jsonwebtoken');
let jwtOptions = require('../config/jwtoptions');
let cors = require('cors');

const User = require('../models/user');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;



//SIGNUP POST
router.post('/signup', (req, res, next) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;

  if (!email || !password) {
    res.status(400).json({message: "Both email and password are required"});
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'Email exists already' });
      return;
    }

    var salt = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      firstName,
      lastName,
      email,
      password: hashPass
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        var payload = {id: user._id};
        console.log('user', user);
        var token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.status(200).json({ message: 'ok', token: token, user: user});
      }
    });

  });
});


//LOGIN POST
router.post('/login', (req, res) => {
  let email;
  let password;

  if(req.body.email && req.body.password) {
    email = req.body.email;
    password = req.body.password;
  }

  if (email === "" || password === "") {
    res.status(401).json({message: "Please provide both email and password"});
    return;
  }

  //Find the user in database.
  User.findOne({ "email": email }, (err, user) => {
    if ( !user ){
      res.status(401).json({message: "Email doesn't exist!"});
    } else {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).json({message: "Password doesn't match.  Please try again..."});
        } else {

          req.session.user = user;  //Storing user data in the session

          var payload = {id: user._id};
          var token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: "24h" });
          return res.json({ message: "ok", token: token, user: user });
          // res.status(200).json({message: "Welcome back...", token: token, user: user});


        }
      });
    }
  });
});




module.exports = router;
