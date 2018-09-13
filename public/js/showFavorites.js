$(document).ready(function() {
  // Check for favs and load them in
  $.ajax({
    url: "/api/loadFavs",
    method: "GET"
  }).then(function(data) {
    console.log(data);
  });

  // Delete a favorite
  $(document).on("click", ".delete-fav-button", function(event) {
    event.preventDefault();
    var id = $(this).data("id");
    $.ajax({
      url: `/api/deleteFav/${id}`,
      method: "GET"
    }).then(function(data) {
      if (data.success) {
        location.reload();
      } else {
        console.log(data);
      }
    });
  });
});
