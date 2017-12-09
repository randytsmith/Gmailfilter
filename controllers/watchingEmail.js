var express = require("express");
var fs = require('fs');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var path = require("path");
var User = require("../models/admin");
var filter = require("./filterProcess");
var bcrypt = require("bcrypt");

function watching(request, response){
  address = request.body.email;
  User.findOne({ email: address }, 'forwarding incoming', function test(err, user) {
      if (err) throw err;
      console.log(user);
      filter.handle(user, response);
  });
};

function addAddress(request, response){
  var newAddress = request.body.filter;
  User.findOne({ email: request.body.email}, 'incoming', function(err, user){
    if (err) throw err;
    var len = user.incoming.length;
    for (i=0;i<len;i++){
      if (newAddress = user.incoming[i]) response.json({result: "error"})
    }
  })
  var condition = { email : request.body.email};
  var update = { $push: { incoming : request.body.filter}};
  var options = {
     upsert : true,
     new : true
   };
  User.findOneAndUpdate(condition, update, options, function(err, res) {
    if (err) throw err;
    response.json({result: "success"});
  });
}

function addString(request, response){
  console.log(request.body);

  var condition = { email : request.body.email};
  var update = { $push: {"forwarding.string" : request.body.string,
                        "forwarding.address" : request.body.forwarding }
               };
  var options = {
    upsert : true,
    new : true
  };
  User.findOneAndUpdate(condition, update, options, function(err, res) {
   if (err) throw err;
   response.json({result: "success"});
 });
};

  module.exports = {
    check: watching,
    add: addAddress,
    string: addString
  }
