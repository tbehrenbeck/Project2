var db = require("../models");
var passport = require("../config/passport");
var callEdamamAPI = require("../edamam");

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

  // Edit profile pic
  app.post("/api/updateProfilePic", function(req,res) {
    var newObj = {
      profilePic: req.body.link
    };

    db.User.update(newObj, {
      where: {
        id: req.user.id
      }
    }).then(function() {
      res.json({success: true});
    });
  });

  // Recipe search
  app.post("/api/recipeSearch", function(req,res) {
    console.log(req.body);
    var rawData = callEdamamAPI();
    var recipes = [];
    for (var i=0; i < rawData.hits.length; i++) {
      var recipe = {
        title: rawData.hits[i].recipe.label,
        url: rawData.hits[i].recipe.url,
        pic: rawData.hits[i].recipe.image,
        calories: rawData.hits[i].recipe.calories,
        fats: rawData.hits[i].recipe.totalNutrients.FAT.quantity,
        protein: rawData.hits[i].recipe.totalNutrients.PROCNT.quantity,
        carbs: rawData.hits[i].recipe.totalNutrients.CHOCDF.quantity,
        serves: rawData.hits[i].recipe.yield
      };
      recipes.push(recipe);
    };
    res.json(recipes);
  });

};
