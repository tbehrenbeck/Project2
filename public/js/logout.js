$(document).ready(function() {

    // Logout
  $("#logout").on("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    console.log("Clearing token");
    location.replace("/");
  });

});