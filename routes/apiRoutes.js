var db = require("../models");
var passport = require("../config/passport");
// var path = require("path");

module.exports = function (app) {

  // Login
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json({success: true});
  });

  // Sign up
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function () {
      res.json({success: true, message: "successfully made account"});
    });
  });

  app.post("/api/test"), function(req,res) {
    res.send("success");
  };

  // Test
  app.get("/api/test", function (req, res) {
    res.send("IN PROGRESS");
  });

};
