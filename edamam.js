var request = require("request");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();

// required to pull personal keys from local .env file for use in keys.js file
require("dotenv").config();

// pull API keys from keys.js file
var keys = require("./keys.js");

// body parser for responses in JSON format
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// vars to build queryURL
var queryText = "chicken"; // only required parameter
var lowerCalorieRange = "100"; // if upperCalorie range is used, lowerCalorie range must also be used
var upperCalorieRange = "300"; // if lowerCalorie range is used, upperCalorie range must also be used
var health = "peanut-free"; // Options: alcohol-free, celery-free, crustacean-free, dairy-free, egg-free, fish-free, gluten-free, kidney-friendly, kosher, low-potassium, lupine-free, mustard-free, No-oil-added, low-sugar, palep, peanut-free, pescatarian, pork-free, red-meat-free, sesame-free, shellfish-free, soy-free, sugar-conscious, tree-nut-free, vegan, vegetarian, wheat-free
var diet = "high-protein"; // Options: balanced, high-protein, high-fiber, low-fat, low-carb, low-sodium
var excluded = "";
var from = "0"; // range for number of search results
var to = "10"; // range for number of search results
var queryUrl = "";

// Build query URL. URL won't work if any parameter is left blank -- any blank parameter must be exlcuded from the URL
function buildQueryURL() {
  queryUrl += ("https://api.edamam.com/search?q=" + queryText);
  queryUrl += ("&app_id=" + keys.edamam.appID + "&app_key=" + keys.edamam.apiKey);
  if (health !== "") {
    queryUrl += ("&health=" + health);
  }
  if (lowerCalorieRange !== "") {
    queryUrl += ("&from=0&to=3&calories=" + lowerCalorieRange + "-" + upperCalorieRange);
  }
  if (health !== "") {
    queryUrl += ("&health=" + health);
  }
  if (diet !== "") {
    queryUrl += ("&diet=" + diet);
  }
  if (excluded !== "") {
    queryUrl += ("&excluded=" + excluded);
  }
  if (to !== "") {
    queryUrl += ("&from=" + from + "&to=" + to + "\"");
  }
}
buildQueryURL();
console.log(queryUrl);

// app.use(function (req, res) {
//     res.end(JSON.stringify(req.body, null, 2))
// });

request(queryUrl, function (error, response, body) {

  // If the request is successful
  if (error) {
    throw error;
  }
  else {
    // loop through all recipe hits
    for (var i = 0; i < 10; i++) {
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log(
        // "name:" + JSON.parse(body.hits[i].recipe.label),
        // "calories: " + body.hits[i].recipe.calories,
        // "healthLabels: " + body.hits[i].recipe.healthLabels,
        // "source: " + body.hits[i].recipe.source,
        // "sourceUrl: " + body.hits[i].recipe.url,
        // "imgUrl: " + body.hits[i].recipe.image,
        // "ingredients: " + body.hits[i].recipe.ingredientLines,
        // "yield: " + body.hits[i].recipe.yield,
        // JSON.parse(body.hits[0].recipe.label),
        // JSON.stringify(body.hits[0].recipe.label),
        JSON.parse(body, null, 2)
      );
    }
  }
});