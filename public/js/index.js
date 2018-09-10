$(document).ready(function() {

  // Modal helper function
  function showModal(modalTitle, modalBody) {
    $("#modal-title").html(modalTitle);
    $("#modal-body").html(modalBody);
    $("#error-modal").modal("toggle");
  };

  // On click submit
  $("#submit-button").on("click", function(event) {
    event.preventDefault();

    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    var rememberMe = $("#remember-me").is(":checked");

    $.ajax({
      url: "/api/login",
      method: "POST",
      data: {username: username, password: password, rememberMe: rememberMe}
    }).then(function(data) {
      // if (!data.success) {
      //   return showModal("Error", data.message);
      // };
      console.log(data);
      window.location.replace(data);

    }).fail(function() {
      showModal("Oops!", "Username or password is incorrect.");
    });

  });

});