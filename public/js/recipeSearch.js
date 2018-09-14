$(document).ready(function() {
  // on click of "search" button

  function showModal(modalTitle, modalBody) {
    $("#modal-title").html(modalTitle);
    $("#modal-body").html(modalBody);
    $("#error-modal").modal("toggle");
  }

  $("#search-btn").on("click", function(event) {
    event.preventDefault();

    // take data from search parameter fields
    var protein = $("#protein-options")
      .val()
      .trim();

    var lower = $("#min-cals")
      .val()
      .trim();
    var upper = $("#max-cals")
      .val()
      .trim();

    var diet = $("#diet-options")
      .val()
      .trim();

    if (protein === "" || diet === "") {
      return showModal("Oops!", "Please select a Meal Type and Diet Option");
    }

    var mealCount = $("#meal-count")
      .val()
      .trim();

    if (lower === "") {
      lower = 10;
    }
    if (upper === "") {
      upper = 2000;
    }
    if (mealCount === "") {
      mealCount = 4;
    }

    var destUrl = `/recipeSearch/${protein}/${lower}/${upper}/${diet}?mealCount=${mealCount}`;
    window.location.replace(destUrl);
  });
});
