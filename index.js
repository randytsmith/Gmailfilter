var express = require("express");
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var path = require("path");
var serverConfig = require("./config");
var indexRoute = require ("./routes/index");

var app = express();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static("public"));
app.use('/', indexRoute)

mongoose.Promise = global.Promise
// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(path.join(__dirname , "./index.html"));
});
app.get("/login", function(request, response) {
  response.sendFile(path.join(__dirname , "./filter.html"));
});

var listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
