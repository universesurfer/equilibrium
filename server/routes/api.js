const express = require("express");
const session = require("express-session");
const router = express.Router();


// let sesh;
// GET api listing
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
