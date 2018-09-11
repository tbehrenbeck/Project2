var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var path = require("path");

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

  app.get("/recipeSearch", function (req, res) {
    res.render("results", {data: false});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
