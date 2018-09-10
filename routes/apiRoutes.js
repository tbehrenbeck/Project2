var db = require("../models");
var passport = require("../config/passport");
// var path = require("path");

module.exports = function (app) {

  // Login
  app.post("/api/login", function (req, res) {
    var username = req.body.username;
    res.json({success: true, username: username});
  });

  // Set up profile
  app.post("/api/createAccount", function (req, res) {
    var username = req.body.username;

    var profile = {
      fullName: req.body.fullName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
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

    db.User.create(profile).then(function () {
      res.json({ success: true, message: "User data added to database" });
    }).catch(function (err) {
      switch(err.errors[0].validatorKey) {
      case "isEmail":
        return res.json({success: false, message: "Invalid email address"});
      case "not_unique":
        return res.json({success: false, message: "Username/email already registerd. <a href='/'>Click here to login.</a>"});
      default:
        return res.json({success: false, message: "Internal server error"});
      };
    });
  });

  // Logout
  app.get("/api/logout", function (req, res) {
    res.redirect("/");
  });

};
