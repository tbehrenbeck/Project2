var request = require('request');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// app.use(function (req, res) {
//   res.end(JSON.stringify(req.body, null, 2))
// })



var queryText = "chicken";
var lowerCalorieRange = "100";
var upperCalorieRange = "300";
var health = "peanut-free"; //alcohol-free, celery-free, crustacean-free, dairy-free, egg-free, fish-free, gluten-free, kidney-friendly, kosher, low-potassium, lupine-free, mustard-free, No-oil-added, low-sugar, palep, peanut-free, pescatarian, pork-free, red-meat-free, sesame-free, shellfish-free, soy-free, sugar-conscious, tree-nut-free, vegan, vegetarian, wheat-free
var diet = "high-protein"; //“balanced”, “high-protein”, “high-fiber”, “low-fat”, “low-carb”, “low-sodium”
var excluded = "";
var from = "0"; // range for number of search results
var to = "10"; // range for number of search results
var queryUrl = "";

// Build query URL. URL wont work if any parameter is left blank -- any blank parameter must be exlcuded from the URL if blank
function buildQueryURL() {
    queryUrl += ("https://api.edamam.com/search?q=" + queryText);
    queryUrl += ("&app_id=f8a1b04f&app_key=04923e4808eba051480e40bf67463cb9");
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
        queryUrl += ("&from=" + from + "&to=" + to + '"');
    }
}
buildQueryURL();
console.log(queryUrl);

request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (error) {
        throw error
    }
    else {
        // loop through all recipe hits
        for (var i = 0; i < 10; i++) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            // console.log(req.body);
            app.use(function (req, res) {
                res.end(JSON.stringify(req.body, null, 2))
            })
            console.log(
                // "name:" + JSON.parse(body.hits[i].recipe.label),
                //     "calories: " + body.hits[i].recipe.calories,
                //     "healthLabels: " + body.hits[i].recipe.healthLabels,
                //     "source: " + body.hits[i].recipe.source,
                //     "sourceUrl: " + body.hits[i].recipe.url,
                //     "imgUrl: " + body.hits[i].recipe.image,
                //     "ingredients: " + body.hits[i].recipe.ingredientLines,
                //     "yield: " + body.hits[i].recipe.yield

                // console.log(JSON.parse(body.hits[0].recipe.label));
                // console.log(JSON.stringify(body.hits[0].recipe.label))
            )
        }
    }
})