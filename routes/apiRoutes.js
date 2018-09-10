var db = require("../models");
var passport = require("../config/passport");
// var path = require("path");

module.exports = function (app) {

  // Login (passport)
  app.post("/api/login", passport.authenticate("local"), function(req,res) {
    res.json("/profile");
  });

  // Create account
  app.post("/api/createAccount", function (req, res) {
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
    req.logout();
    res.redirect("/");
  });

  // Verify token
  // app.post("/api/token", function(req,res) {
  //   var token = req.body.token;
  //   jwt.verify(token, process.env.SECRETPHRASE, function(err, decoded) {
  //     if (err) {
  //       return res.json({validToken: false})
  //     }
  //     db.User.findOne({
  //       where: {
  //         id: decoded.id
  //       }
  //     }).then(function(data) {
  //       console.log(data.username);
  //       return res.json({validToken: true, username: data.username, fullName: data.fullName});
  //     });
  //   });
    
  // });

};
