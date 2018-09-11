// VARIABLES
// npm required to make AJAX call to edamam API
var request = require("request");

// pull personal keys from local .env file for use in keys.js file
require("dotenv").config();

// pull API keys from keys.js file
var keys = require("./keys.js");

// vars to build queryURL
var queryText = "chicken"; // only required search parameter
var lowerCalorieRange = "100"; // if upperCalorie range is used, lowerCalorie range must also be used
var upperCalorieRange = "300"; // if lowerCalorie range is used, upperCalorie range must also be used
var health = "peanut-free"; // Options: alcohol-free, celery-free, crustacean-free, dairy-free, egg-free, fish-free, gluten-free, kidney-friendly, kosher, low-potassium, lupine-free, mustard-free, No-oil-added, low-sugar, paleo, peanut-free, pescatarian, pork-free, red-meat-free, sesame-free, shellfish-free, soy-free, sugar-conscious, tree-nut-free, vegan, vegetarian, wheat-free
var diet = "high-protein"; // Options: balanced, high-protein, high-fiber, low-fat, low-carb, low-sodium
var excluded = "";
var from = "0"; // range for number of search results
var to = "10"; // range for number of search results
var queryUrl = "";

// var to hold all recipe search results
var recipeResultsArray = [];

// FUNCTIONS
// Build query URL. URL won't work if any parameter is left blank -- any blank parameter must be exlcuded from the URL.
function buildQueryURL() {
  queryUrl += ("https://api.edamam.com/search?q=" + queryText); // add REEQUIRED search parameter "queryText" to URL
  queryUrl += ("&app_id=" + keys.edamam.appID + "&app_key=" + keys.edamam.apiKey); // add api ID and key to URL
  // for each of the following OPTIONAL parameters, if parameter exists, add it to URL
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

// function to build a string to hold the details of each new recipe (this string will be pushed to the recipeResultsArray)
function Recipe(name, healthLabels, dietLabels, source, sourceURL, imgURL, ingredientLines, servYield, totalTime, calories, fatQty, fatUnit, satFatQty, satFatUnit, transFatQty, transFatUnit, carbsQty, carbsUnit, fiberQty, fiberUnit, sugarQty, sugarUnit, proteinQty, proteinUnit, cholesterolQty, cholesterolUnit, sodiumQty, sodiumUnit){
  this.name = name;
  this. healthLabels = healthLabels;
  this.dietLabels = dietLabels;
  this.source = source;
  this.sourceURL = sourceURL;
  this. imgURL = imgURL;
  this.ingredientLines = ingredientLines;
  this.servYield = servYield;
  this.totalTime = totalTime;
  this.calories = calories;
  this.fatQty = fatQty;
  this.fatUnit = fatUnit;
  this.satFatQty = satFatQty;
  this.satFatUnit = satFatUnit;
  this.transFatQty = transFatQty;
  this.transFatUnit = transFatUnit;
  this.carbsQty = carbsQty;
  this.carbsUnit = carbsUnit;
  this.fiberQty = fiberQty;
  this.fiberUnit = fiberUnit;
  this.sugarQty = sugarQty;
  this.sugarUnit = sugarUnit; 
  this.proteinQty = proteinQty;
  this.proteinUnit = proteinUnit;
  this.cholesterolQty = cholesterolQty;
  this.cholesterolUnit = cholesterolUnit;
  this.sodiumQty = sodiumQty;
  this.sodiumUnit = sodiumUnit;
}

// function to query the Edamam API
function callEdamamAPI(){
  buildQueryURL();
  console.log("query URL built");
  console.log(queryUrl);

  // request recipes from Edamam API
  request(queryUrl, function (error, response, body) {
  
    // If the request is successful
    if (error) {
      throw error;
    }
    else {
      var response = JSON.parse(body).hits;
      // loop through all recipe hits
      for (var i = 0; i < response.length ; i++) {
        var recipe = JSON.parse(body).hits[i].recipe;
        // local variables to hold contents of each recipe
        var name = recipe.label;
        var healthLabels = recipe.healthLabels;
        var dietLabels = recipe.dietLabels;
        var source = recipe.source;
        var sourceUrl = recipe.url;
        var imgUrl = recipe.image;
        var ingredientLines = recipe.ingredientLines;
        var servYield = recipe.yield;
        var totalTime = recipe.totalTime;
        var calories = ((recipe.calories).toFixed(1))/servYield;
        var fatQty = ((recipe.totalNutrients.FAT.quantity).toFixed(1))/servYield;
        var fatUnit = recipe.totalNutrients.FAT.unit;
        var satFatQty = ((recipe.totalNutrients.FASAT.quantity).toFixed(1))/servYield;
        var satFatUnit = recipe.totalNutrients.FASAT.unit;
        var transFatQty = ((recipe.totalNutrients.FATRN.quantity).toFixed(1))/servYield;
        var transFatUnit = recipe.totalNutrients.FATRN.unit;
        var carbsQty = ((recipe.totalNutrients.CHOCDF.quantity).toFixed(1))/servYield;
        var carbsUnit = recipe.totalNutrients.CHOCDF.unit;
        var fiberQty = ((recipe.totalNutrients.FIBTG.quantity).toFixed(1))/servYield;
        var fiberUnit = recipe.totalNutrients.FIBTG.unit;
        var sugarQty = ((recipe.totalNutrients.SUGAR.quantity).toFixed(1))/servYield;
        var sugarUnit = recipe.totalNutrients.SUGAR.unit;
        var proteinQty = ((recipe.totalNutrients.PROCNT.quantity).toFixed(1))/servYield;
        var proteinUnit = recipe.totalNutrients.PROCNT.unit;
        var cholesterolQty = ((recipe.totalNutrients.CHOLE.quantity).toFixed(1))/servYield;
        var cholesterolUnit = recipe.totalNutrients.CHOLE.unit;
        var sodiumQty = ((recipe.totalNutrients.NA.quantity).toFixed(1))/servYield;
        var sodiumUnit = recipe.totalNutrients.NA.unit;
  
        var recipe = new Recipe (name, healthLabels, dietLabels, source, sourceUrl, imgUrl, ingredientLines, servYield, totalTime, calories, fatQty, fatUnit, satFatQty, satFatUnit, transFatQty, transFatUnit, carbsQty, carbsUnit, fiberQty, fiberUnit, sugarQty, sugarUnit, proteinQty, proteinUnit, cholesterolQty, cholesterolUnit, sodiumQty, sodiumUnit);

        // push recipe data to recipeResultsArray
        recipeResultsArray.push(recipe);
      }
      console.log(recipeResultsArray);
    }
  });
}

// LOGIC
// call function to build queryURL
// callEdamamAPI();
module.exports = callEdamamAPI;
