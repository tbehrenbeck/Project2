var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  // Login (passport)
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // var token = jwt.sign({ id: req.user.id, expires: Date.now() + 360000 }, process.env.SECRETPHRASE);
    res.json({ url: "/profile" });
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

    // Add user to DB
    db.User.create(profile).then(function () {
      res.redirect(307, "/api/login");
      // res.json({ success: true, message: "User data added to database" });
    }).catch(function (err) {
      if (err) {
        switch (err.errors[0].validatorKey) {
          case "isEmail":
            return res.json({ success: false, message: "Invalid email address" });
          case "not_unique":
            return res.json({ success: false, message: "Username/email already registerd. <a href='/'>Click here to login.</a>" });
          default:
            return res.json({ success: false, message: "Internal server error" });
        }
      }
    });
  });

  // Logout
  app.get("/api/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Get user data (if logged in)
  app.get("/api/user_data", function (req, res) {
    if (req.user === undefined) {
      // The user is not logged in
      res.json({});
    } else {
      res.json({
        username: req.user.username,
        fullName: req.user.fullName
      });
    }
  });

};
