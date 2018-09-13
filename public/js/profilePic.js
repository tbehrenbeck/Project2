var newLink = "";

$(document).ready(function() {
  // Click the edit button to bring up the modal
  $("#edit-profile-pic").on("click", function(event) {
    event.preventDefault();
    newLink = prompt("URL to profile pic:");
    if (newLink === null){
      return;
    } else if (newLink == "") {
      return alert("Invalid URL");
    }

    $.ajax({
      url: "/api/updateProfilePic",
      method: "POST",
      data: { link: newLink }
    }).then(function(data) {
      console.log(data);
      location.reload();
    });
  });
});
