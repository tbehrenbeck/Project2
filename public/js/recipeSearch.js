$(document).ready(function() {
  // on click of "search" button
  $("#search-btn").on("click", function(event) {
    event.preventDefault();

    // take data from search parameter fields
    var protein = $("#protein-options")
      .val()
      .trim();

    var lower = parseInt(
      $("#min-cals")
        .val()
        .trim()
    );
    var upper = parseInt(
      $("#max-cals")
        .val()
        .trim()
    );
    var diet = $("#diet-options")
      .val()
      .trim();
    var mealCount = parseInt(
      $("#meal-count")
        .val()
        .trim()
    );

    var destUrl = `/recipeSearch/${protein}/${lower}/${upper}/${diet}`;
    window.location.replace(destUrl);
  });
});
