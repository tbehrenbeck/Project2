var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var path = require("path");
var buildQueryURL = require("../edamam");
var request = require("request");

module.exports = function (app) {

  // Load index page
  app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../public/main.html"));
  });

  // Load create account page
  app.get("/createAccount", function (req, res) {
    res.redirect("/createAccount.html");
  });

  // Load a user's profile
  app.get("/profile", isAuthenticated, function (req, res) {
    var username = req.user.username;

    db.User.findOne({
      where: {
        username: username
      }
    }).then(function (data) {
      if (data == null) {
        return res.send(`Username ${username} not found`);
      };
      res.render("profile", { data: data });
    });
  });

  // Search for a recipe, render handlebars
  app.get("/recipeSearch/:protein/:lower/:upper/:health/:diet", function (req, res) {
    var queryURL = buildQueryURL(req.params.protein, req.params.lower, req.params.upper, req.params.health, req.params.diet);

    request(queryURL, function (err, response, body) {
      if (err) {
        throw err + response;
      };

      var rawData = JSON.parse(body);
      var data = [];
      for (var i = 0; i < rawData.hits.length; i++) {
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
        data.push(recipe);
      };
      console.log(data);
      res.render("results", { data: data });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
