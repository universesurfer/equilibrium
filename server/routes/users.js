var express = require("express");
var router = express.Router();
const User = require('../models/user');
const mongoose = require("mongoose");

router.get('/profile/:id', (req, res) => {
  console.log("Getting a user from the database");
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(user);
    }
  });
});
