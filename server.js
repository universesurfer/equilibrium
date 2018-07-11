//Require Dependencies
require('dotenv').config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const multer = require('multer');
const logger = require("morgan");  //logs our requests to the console
const app = express();
const cors = require('cors');

//Connect MongoDB
// const MongoURI = process.env.MONGODB_URI;
// // || process.env.MONGOURI_DEV;
// // const MongoURI = process.env.MONGOURI_DEV;
//
// mongoose.connect(MongoURI, {useMongoClient: true}, function(err, res){
//   if(err) {
//     console.log('Error connecting to: ' + MongoURI + '. ' + err);
//   } else {
//     console.log('Successful connection to ' + MongoURI + '.');
//   }
// });

// mongoose.connect("mongodb://localhost:27017/equilibrium");
// require('./config/database');


//Get our API routes
const api = require("./server/routes/api");
const auth = require("./server/routes/auth");
// const users = require("./server/routes/users");
// const users = require("./server/routes/users");


var corsOptions = {credentials: true, origin: 'http://ethos-app.herokuapp.com'};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// app.use(cors());
// app.options('*', cors());

app.use(logger('dev'));  //log every request to the console

//Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Initializing Express-Session
app.use(session({
  secret: "ironhack",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.set('view engine', 'ejs');  //setup ejs for templating


//Setup passport
// app.use(session({
//     secret: "ilovescotch"      //session secret
// }));

app.use(passport.initialize());
app.use(passport.session());   //persistent login sessions
app.use(flash());     //use connect-flash for flash messages stored in session



//Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//Set our api routes
app.use('/', api);
app.use('/', auth);
// app.use('/profile/:id', users);
// app.use('/', users);

//Allows the use of /server filepath when serving uploaded user images
app.use('/server', express.static(path.join(__dirname, '/server')));

//Catch all other routes and return the index file.
//Catch-all route MUST come after all other API routes have been defined.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port, () => console.log(`API running on localhost: ${port}`));
