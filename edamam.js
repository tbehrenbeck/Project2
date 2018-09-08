var request = require("request");
var bodyparse = require("body-parser");

var queryText = "chicken";
var calorieRange = "100-2000";
var health = "peanut-free"; //alcohol-free, celery-free, crustacean-free, dairy-free, egg-free, fish-free, gluten-free, kidney-friendly, kosher, low-potassium, lupine-free, mustard-free, No-oil-added, low-sugar, palep, peanut-free, pescatarian, pork-free, red-meat-free, sesame-free, shellfish-free, soy-free, sugar-conscious, tree-nut-free, vegan, vegetarian, wheat-free
var diet = "high-protein"; //“balanced”, “high-protein”, “high-fiber”, “low-fat”, “low-carb”, “low-sodium”
var excluded = "";
var from = "0" // range for number of search results
var to = "10" // range for number of search results


var queryUrl = "https://api.edamam.com/search?q=" + queryText + "&app_id=f8a1b04f&app_key=04923e4808eba051480e40bf67463cb9&from=0&to=3&calories=" + calorieRange + "&health=" + health + "&diet=" + diet+ "&excluded=" + excluded + "&from=" + from + "&to=" + to;

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (error) {
        throw error
    }
    else {
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        // console.log(JSON.parse(body));
        // console.log(
        //     "name: " + recipes.hits[0].recipe.label,
        //     "calories: " + recipes.hits[0].recipe.calories,
        //     "healthLabels: " + recipes.hits[0].recipe.healthLabels,
        //     "source: " + recipes.hits[0].recipe.source,
        //     "sourceUrl: " + recipes.hits[0].recipe.url,
        //     "imgUrl: " + recipes.hits[0].recipe.image,
        //     "ingredients: " + recipes.hits[0].recipe.ingredientLines,
        //     "yield: " + recipes.hits[0].recipe.yield
        // );
        console.log(JSON.parse(body));
        // console.log(JSON.parse(body.hits[0].recipe))
    }
});
