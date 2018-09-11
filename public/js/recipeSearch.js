$(document).ready(function () {

  // on click of "search" button
  $("#search-btn").on("click", function (event) {
    event.preventDefault();

    // take data from search parameter fields
    var protein = $("#protein-options").val().trim();
    var lower = parseInt($("#min-cals").val().trim());
    var upper = parseInt($("#max-cals").val().trim());
    var health = $("#health-options").val().trim();
    var diet = $("#diet-options").val().trim();
    var mealCount = parseInt($("#meal-count").val().trim());

    var destUrl = `/recipeSearch/${protein}/${lower}/${upper}/${health}/${diet}`;
    window.location.replace(destUrl);

    // send data to "/api/recipeSearch"
    // $.ajax({
    //   url: "/api/recipeSearch",
    //   method: "POST",
    //   data: {
    //     protein: protein,
    //     lowerCalorieRange: lowerCalorieRange,
    //     upperCalorieRange: upperCalorieRange,
    //     health: health,
    //     diet: diet,
    //     mealCount: mealCount 
    //   }}).then(function (data) {
    //   console.log(data);
    //   var destUrl = 
    //     `/`
    // });

  });

});