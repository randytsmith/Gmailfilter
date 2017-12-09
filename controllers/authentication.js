var express = require("express");
var fs = require('fs');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var path = require("path");
var User = require("../models/admin");
var bcrypt = require("bcrypt");

function authentication(request, response){
   // insert data into DB
  var data = new User({
    email: request.body.email,
    password: request.body.password
  });
    User.findOne({ email: data.email }, function(err, user) {
        if (err) throw error;
        if (!user) {
          response.json({status:"err"});
        }
        else {
            // test a matching password
          user.comparePassword(data.password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
              response.json({
                status:"success",
                role: user.role,
                email: user.email
              });
            }
            else {
              response.json({status:"err"});
            }
         });
       }
    });
  }

  module.exports.check = authentication;
