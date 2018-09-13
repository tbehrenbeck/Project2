$(document).ready(function() {
  // on click of "search" button
  $("#search-btn").on("click", function(event) {
    event.preventDefault();

    // take data from search parameter fields
    var protein = $("#protein-options")
      .val()
      .trim();

    var lower = $("#min-cals").val().trim();
    var upper = $("#max-cals").val().trim();

    var diet = $("#diet-options")
      .val()
      .trim();
    var mealCount = parseInt(
      $("#meal-count")
        .val()
        .trim()
    );
    alert(lower);
    alert(upper);
    if (lower === "") {
      lower = 10;
    }
    if (upper === "") {
      upper = 2000;
    }

    var destUrl = `/recipeSearch/${protein}/${lower}/${upper}/${diet}`;
    window.location.replace(destUrl);
  });
});
