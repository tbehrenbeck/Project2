// Verify if user selected "remember me" and logged in
var token = localStorage.getItem("token");
if (token) {
  $.ajax({
    url: "/api/token",
    method: "POST",
    data: {token: token}
  }).then(function(data) {
    if (data.validToken) {
      var html = 
        `Welcome back ${data.fullName}! <a href="/profile/${data.username}">Click here</a> to view your profile.`;
      $("#welcome-back-box").html(html);
    };
  });
};


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
      if (!data.success) {
        return showModal("Error", data.message);
      };
      console.log(data);
      if (rememberMe) {
        localStorage.setItem("token", data.token);
      };
      location.replace(`/profile/${data.username}`);
    });

  });

});