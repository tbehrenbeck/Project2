$(document).ready(function () {

  // on click of "search" button
  $("#search-btn").on("click", function (event) {
    event.preventDefault();

    // take data from search parameter fields
    var protein = $("#protein-options").val().trim();
    var lowerCalorieRange = parseInt($("#min-cals").val().trim());
    var upperCalorieRange = parseInt($("#max-cals").val().trim());
    var health = $("#health-options").val().trim();
    var diet = $("#diet-options").val().trim();
    var mealCount = parseInt($("#meal-count").val().trim());

    // send data to "/api/recipeSearch"
    $.ajax({
      url: "/api/recipeSearch",
      method: "POST",
      data: {
        protein: protein,
        lowerCalorieRange: lowerCalorieRange,
        upperCalorieRange: upperCalorieRange,
        health: health,
        diet: diet,
        mealCount: mealCount 
      }}).then(function (data) {
      console.log(data);
    });

  });

});