var express = require("express");
var mongoose = require("mongoose");
var User = require("../models/admin");

function adminSetting(request, response){
  newAddress = request.body.email;
  newPassword = request.body.password;
  var condition = { role : "Admin"};
  var update = { address : newAddress, password : newPassword};
  var options = {
    upsert : true,
    new : true
  };
  User.findOne({ role: "Admin" }, '_id email', function (err, newUser) {
      if (err) return handleError(err);
      User.findById(newUser._id, function (err, person) {
        if (err) return handleError(err);
        person.email = newAddress;
        person.password = newPassword;
        person.save(function (err, updated) {
          if (err) return handleError(err);
        });
     });
  });
}

function allUsers(request, response){
  User.find({role: "User"}, 'email', function (err, Users){
    console.log(Users);
    response.json(Users);
  })
}

function userSetting(request, response){
   var user=new User({
     email: request.body.email,
     password: request.body.password,
     role: "User"
   });
   User.findOne({email: request.body.email}, function(err, data){
    if (err) throw err;
    if (!data){
        user.save(function(err){
          if (err) throw err;
          response.json({result: success});
      })
    }
    else{
      response.json({result: error});
    }
  });
}

function addString(request, response){
  console.log(request.body);

  var condition = { email : request.body.email};
  var update = {
                $push: {"forwarding.string" : request.body.string,
                        "forwarding.address" : request.body.forwarding }
               };
  var options = {
    upsert : true,
    new : true
  };

  User.findOneAndUpdate(condition, update, options, function(err, res) {
   if (err) throw err;
   console.log(res);
 });
};


module.exports = {
  admin: adminSetting,
  user: userSetting,
  allUsers: allUsers
}
