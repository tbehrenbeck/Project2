var db = require("../models");

module.exports = function(app) {

  // Load index page
  app.get("/", function(req,res) {
    res.redirect("/index.html");
  });

  // Load index page
  app.get("/createAccount", function(req,res) {
    res.redirect("/macro.html");
  });

  app.get("/recipeSearch", function(req,res) {
    res.redirect("/recipeSearch.html");
  });

  app.get("/:user/profile", function(req,res) {
    var user = req.body.user;
    var data = db.User.findOne({
      where: {
        user: user
      }
    });
    res.render("profile", {data: data});
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
