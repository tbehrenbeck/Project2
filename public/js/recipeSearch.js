$(document).ready(function () {

  // on click of "search" button
  $("#search-btn").on("click", function (event) {
    event.preventDefault();

    // take data from search parameter fields
    var queryText = $("#protein-options").val().trim();
    var lowerCalorieRange = $("#min-cals").val().trim();
    var upperCalorieRange = $("#max-cals").val().trim();
    var health = $("#health-options").val().trim();
    var diet = $("#diet-options").val().trim();

    // send data to "/api/recipeSearch"
    $.ajax({
      url: "/api/recipeSearch",
      method: "POST",
      data: { queryText: queryText, lowerCalorieRange: lowerCalorieRange, upperCalorieRange: upperCalorieRange, health: health, diet: diet }
    }).then(function (data) {
        console.log(data);
    });

  });

});