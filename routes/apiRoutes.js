var db = require("../models");
var passport = require("../config/passport");
var buildQueryURL = require("../edamam");
var request = require("request");

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
      console.log(err);
      if (err.errors) {
        return res.json({success: false, message: "Email address or uesrname already registered."});
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
  app.post("/api/updateProfilePic", function (req, res) {
    var newObj = {
      profilePic: req.body.link
    };

    db.User.update(newObj, {
      where: {
        id: req.user.id
      }

    }).then(function () {
      res.json({ success: true });
    });
  });

  // Add to favorites
  app.post("/api/addToFavs", function(req,res) {
    var user = req.user.id;
    var recipeInfo = req.body;
    recipeInfo.id = undefined;
    recipeInfo.UserId = user;

    db.Favorite.create(recipeInfo).then(function() {
      res.json({success: true, message: "Successfully added to favorites."});
    }).catch(function(err) {
      return console.log(err);
    });
  });

  // Load favorites
  app.get("/api/loadFavs", function(req,res) {
    if (!req.user) {
      return res.json({success: false, message: "Not signed in"});
    }
    userId = req.user.id;

    db.Favorite.findAll({
      where: {
        UserId: userId
      }
    }).then(function(data) {
      return res.json(data);
    });
  });

  // Delete favorite
  app.get("/api/deleteFav/:id", function(req,res) {
    if (!req.user) {
      return res.json({success: false, message: "Not signed in"});
    }
    db.Favorite.destroy({
      where: {
        id: req.params.id
      }
    }).then(function() {
      return res.json({success: true});
    });
  });

  // Edit macros route
  app.post("/api/editMacros", function(req,res) {
    if (!req.user) {
      return res.json({success: false, message: "Not signed in"});
    }
    var userId = req.user.id;
    var newMacros = {
      recCals: parseInt(req.body.recCals),
      protein: parseInt(req.body.protein),
      carbs: parseInt(req.body.carbs),
      fats: parseInt(req.body.fats)
    };
    db.User.update(newMacros, {
      where: {
        id: userId
      }
    }).then(function() {
      res.json({success: true, message: "Success!", url: "/profile"});
    });
  });

  // Recipe search JSON output
  app.post("/api/recipeSearch", function (req, res) {

    var queryURL = buildQueryURL(req.body.protein, req.body.lowerCalorieRange, req.body.upperCalorieRange, req.body.health, req.body.diet);

    request(queryURL, function (err, response, body) {
      if (err) {
        throw err + response;
      }

      var rawData = JSON.parse(body);
      var recipes = [];
      for (var i = 0; i < rawData.hits.length; i++) {
        var recipe = {
          title: rawData.hits[i].recipe.label,
          url: rawData.hits[i].recipe.url,
          pic: rawData.hits[i].recipe.image,
          time: rawData.hits[i].recipe.totalTime,
          calories: rawData.hits[i].recipe.calories,
          fats: rawData.hits[i].recipe.totalNutrients.FAT.quantity,
          protein: rawData.hits[i].recipe.totalNutrients.PROCNT.quantity,
          carbs: rawData.hits[i].recipe.totalNutrients.CHOCDF.quantity,
          serves: rawData.hits[i].recipe.yield
        };
        recipes.push(recipe);
      }
      return res.json(recipes);
    });

  });

};
