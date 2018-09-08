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

  // Set up profile
  app.post("/api/setupProfile", function(req,res) {
    var name = req.body.name;

    var profile = {
      goal: req.body.goal,
      gender: req.body.gender,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      activityLevel: req.body.activityLevel,
      mealCount: req.body.mealCount,
      recCals: req.body.recCals,
      protein: req.body.protein,
      carbs: req.body.carbs,
      fats: req.body.fats
    };

    db.User.update(profile, {
      where: {
        name: name
      }
    }).then(function() {
      return res.json({success: true, message: "User data added to database"});
    });
  });

  // Test
  app.get("/api/test", function (req, res) {
    res.send("IN PROGRESS");
  });

};
