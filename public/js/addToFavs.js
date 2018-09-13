$(document).ready(function () {

  $(document).on("click", ".addToFavsBtn", function(event) {
    event.preventDefault();
    alert("Added to favorites list!");

    var recipeInfo = $(this).data("json");
    console.log(recipeInfo);

    $.ajax({
      url: "/api/addToFavs",
      method: "POST",
      data: recipeInfo
    }).then(function(data) {
      console.log("Added to favs");
      if (data.success) {
        $(this).html("Added!");
      } else {
        console.log("Something went wrong");
      }
    });

  });

});