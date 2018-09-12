// VARIABLES
// npm required to make AJAX call to edamam API
var request = require("request");

// pull personal keys from local .env file for use in keys.js file
require("dotenv").config();

// pull API keys from keys.js file
var keys = require("./keys.js");

// vars to build queryURL
var queryText = ""; // only required search parameter
var lowerCalorieRange = ""; // if upperCalorie range is used, lowerCalorie range must also be used
var upperCalorieRange = ""; // if lowerCalorie range is used, upperCalorie range must also be used
var health = ""; // Options: alcohol-free, celery-free, crustacean-free, dairy-free, egg-free, fish-free, gluten-free, kidney-friendly, kosher, low-potassium, lupine-free, mustard-free, No-oil-added, low-sugar, paleo, peanut-free, pescatarian, pork-free, red-meat-free, sesame-free, shellfish-free, soy-free, sugar-conscious, tree-nut-free, vegan, vegetarian, wheat-free
var diet = ""; // Options: balanced, high-protein, high-fiber, low-fat, low-carb, low-sodium
var excluded = ""; // hard coded to null -- future dev will allow user to change this
var from = "0"; // range for number of search results
var to = "100"; // range for number of search results -- hard coded to return 100 results -- future dev will allow user to change this
var queryUrl = "";

// var to hold all recipe search results
// var recipeResultsArray = [];

// FUNCTIONS
// Function to get search parameters from user input in porfile.html

// Build query URL. URL won't work if any parameter is left blank -- any blank parameter must be exlcuded from the URL.
// function buildQueryURL(queryText, lowerCalorieRange, upperCalorieRange, health, diet) {
//   queryUrl += ("https://api.edamam.com/search?q=" + queryText); // add REQUIRED search parameter "queryText" to URL
//   queryUrl += ("&app_id=" + keys.edamam.appID + "&app_key=" + keys.edamam.apiKey); // add api ID and key to URL
//   // for each of the following OPTIONAL parameters, if parameter exists, add it to URL
//   if (health !== "") {
//     queryUrl += ("&health=" + health);
//   }
//   if (lowerCalorieRange !== "") {
//     queryUrl += ("&from=0&to=3&calories=" + lowerCalorieRange + "-" + upperCalorieRange);
//   }
//   if (health !== "") {
//     queryUrl += ("&health=" + health);
//   }
//   if (diet !== "") {
//     queryUrl += ("&diet=" + diet);
//   }
//   if (excluded !== "") {
//     queryUrl += ("&excluded=" + excluded);
//   }
//   if (to !== "") {
//     queryUrl += ("&from=" + from + "&to=" + to + '"');
//   };
//   console.log(queryUrl);
//   return queryUrl;
// };

if (process.env.appID) {
  var appID = process.env.appID;
} else {
  var appID = keys.edamam.appID;
}

if (process.env.apiKey) {
  var apiKey = process.env.apiKey;
} else {
  var apiKey = keys.edamam.apiKey;
}

function buildQueryURL(protein, lower, upper, health, diet) {
  var queryURL = 
    `https://api.edamam.com/search?app_id=${appID}&app_key=${apiKey}&` +
    `q=${protein}&calories=${lower}-${upper}&` +
    `health=${health}&diet=${diet}`;
  console.log(queryURL);
  return queryURL;
};


// function to build a string to hold the details of each new recipe (this string will be pushed to the recipeResultsArray)
function Recipe(name, healthLabels, dietLabels, source, sourceURL, imgURL, ingredientLines, servYield, totalTime, calories, fatQty, fatUnit, satFatQty, satFatUnit, transFatQty, transFatUnit, carbsQty, carbsUnit, fiberQty, fiberUnit, sugarQty, sugarUnit, proteinQty, proteinUnit, cholesterolQty, cholesterolUnit, sodiumQty, sodiumUnit) {
  this.name = name;
  this.healthLabels = healthLabels;
  this.dietLabels = dietLabels;
  this.source = source;
  this.sourceURL = sourceURL;
  this.imgURL = imgURL;
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
function callEdamamAPI(queryText, lowerCalorieRange, upperCalorieRange, health, diet) {
  buildQueryURL(queryText, lowerCalorieRange, upperCalorieRange, health, diet);
  console.log("query URL built");
  console.log(queryUrl);
  var recipeResultsArray = [];
  // request recipes from Edamam API
  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (error) {
      throw error;
    }
    else {
      var response = JSON.parse(body);
      // loop through all recipe hits
      for (var i = 0; i < response.length; i++) {
        var recipe = JSON.parse(body)[i].recipe;
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
        var calories = ((recipe.calories).toFixed(1)) / servYield;
        var fatQty = ((recipe.totalNutrients.FAT.quantity).toFixed(1)) / servYield;
        var fatUnit = recipe.totalNutrients.FAT.unit;
        var satFatQty = ((recipe.totalNutrients.FASAT.quantity).toFixed(1)) / servYield;
        var satFatUnit = recipe.totalNutrients.FASAT.unit;
        var transFatQty = ((recipe.totalNutrients.FATRN.quantity).toFixed(1)) / servYield;
        var transFatUnit = recipe.totalNutrients.FATRN.unit;
        var carbsQty = ((recipe.totalNutrients.CHOCDF.quantity).toFixed(1)) / servYield;
        var carbsUnit = recipe.totalNutrients.CHOCDF.unit;
        var fiberQty = ((recipe.totalNutrients.FIBTG.quantity).toFixed(1)) / servYield;
        var fiberUnit = recipe.totalNutrients.FIBTG.unit;
        var sugarQty = ((recipe.totalNutrients.SUGAR.quantity).toFixed(1)) / servYield;
        var sugarUnit = recipe.totalNutrients.SUGAR.unit;
        var proteinQty = ((recipe.totalNutrients.PROCNT.quantity).toFixed(1)) / servYield;
        var proteinUnit = recipe.totalNutrients.PROCNT.unit;
        var cholesterolQty = ((recipe.totalNutrients.CHOLE.quantity).toFixed(1)) / servYield;
        var cholesterolUnit = recipe.totalNutrients.CHOLE.unit;
        var sodiumQty = ((recipe.totalNutrients.NA.quantity).toFixed(1)) / servYield;
        var sodiumUnit = recipe.totalNutrients.NA.unit;

        var recipe = new Recipe(name, healthLabels, dietLabels, source, sourceUrl, imgUrl, ingredientLines, servYield, totalTime, calories, fatQty, fatUnit, satFatQty, satFatUnit, transFatQty, transFatUnit, carbsQty, carbsUnit, fiberQty, fiberUnit, sugarQty, sugarUnit, proteinQty, proteinUnit, cholesterolQty, cholesterolUnit, sodiumQty, sodiumUnit);

        // push recipe data to recipeResultsArray
        recipeResultsArray.push(recipe);
        console.log(recipeResultsArray);
      }

      console.log(body);


      console.log("------recipeResultsArray-------------")
      console.log(recipeResultsArray);
      console.log("------recipeResultsArray-------------")

      recipeFunc(recipeResultsArray);

      function recipeFunc(rawData) {
        console.log("------rawData-------------")

        console.log(rawData);
        console.log("--------rawData-----------")

        var recipes = [];
        for (var i = 0; i < rawData.length; i++) {
          var recipe = {
            title: rawData[i].recipe.label,
            url: rawData[i].recipe.url,
            pic: rawData[i].recipe.image,
            calories: rawData[i].recipe.calories,
            fats: rawData[i].recipe.totalNutrients.FAT.quantity,
            protein: rawData[i].recipe.totalNutrients.PROCNT.quantity,
            carbs: rawData[i].recipe.totalNutrients.CHOCDF.quantity,
            serves: rawData[i].recipe.yield
          };
          recipes.push(recipe);
        };
        console.log("________recipes");
        console.log(recipes);
        console.log("________recipes");
      }

      console.log(recipeResultsArray);
      return recipeResultsArray;
    }
  });
}

// EXPORT LOGIC
module.exports = buildQueryURL;
