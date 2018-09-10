// Check if user logged in previously using "remember me"
$.getJSON("api/user_data", function (data) {
  if (data.fullName) {
    var html =
      `Welcome back ${data.fullName}! <a href="/profile">Click here</a> to view your profile.`;
    $("#welcome-back-box").html(html);
  }
});

$(document).ready(function () {

  // Modal helper function
  function showModal(modalTitle, modalBody) {
    $("#modal-title").html(modalTitle);
    $("#modal-body").html(modalBody);
    $("#error-modal").modal("toggle");
  };

  // On click submit
  $("#submit-button").on("click", function (event) {
    event.preventDefault();

    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    var rememberMe = $("#remember-me").is(":checked");

    $.ajax({
      url: "/api/login",
      method: "POST",
      data: { username: username, password: password, rememberMe: rememberMe }
    }).then(function (data) {
      // localStorage.setItem("token", data.token);
      window.location.replace(data.url);
    }).fail(function () {
      showModal("Oops!", "Username or password is incorrect.");
    });

  });

});