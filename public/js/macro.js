// Modal helper function
function showModal(modalTitle, modalBody) {
  $("#modal-title").html(modalTitle);
  $("#modal-body").html(modalBody);
  $("#error-modal").modal("toggle");
}

$(document).ready(function () {

  //calculate maintenance calories
  function calcCals(kg, pa, age, ht, gender) {
    if (gender === "male" || gender === "Male") {
      return Math.round((kg * 10 + ht * 6.25 - 5 * age + 5) * pa);
    } else {
      return Math.round((kg * 10 + ht * 6.25 - 5 * age - 161) * pa);
    }
  }

  //calculate macro breakdown
  function calcMacros(goal, maintenanceCals, wt) {
    var recCals = 0;
    var protein = 0;
    var carbs = 0;
    var fats = 0;
    var recommended = {};

    switch (goal) {
    case 1:
      //Lose body fat --
      //20% below main cals, fats 30%, protein 1g/pound,
      recCals = maintenanceCals - maintenanceCals * 0.2;
      protein = wt * 1.2;
      fats = (recCals * 0.3) / 9;
      carbs = (recCals - protein * 4 - fats * 9) / 4;
      break;
    case 2:
      //Gain muscle --
      //10% above main cals, fats 20%, protein 1.2g/pound,
      recCals = maintenanceCals + maintenanceCals * 0.1;
      protein = wt * 1.2;
      fats = (recCals * 0.2) / 9;
      carbs = (recCals - protein * 4 - fats * 9) / 4;
      break;
    case 3:
      //Maintain weight--
      //maintenance cals, fats 25%, protein 1.1g/pound,
      recCals = maintenanceCals;
      protein = wt * 1.1;
      fats = (recCals * 0.3) / 9;
      carbs = (recCals - protein * 4 - fats * 9) / 4;
      break;
    }

    recommended = {
      recCals: Math.round(recCals),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats)
    };
    return recommended;
  }

  $("#regForm").on("submit", function (event) {
    event.preventDefault();
  });

  $(document).on("click", "#submitBtn", function (event) {
    event.preventDefault();

    var fullName = $("#fullName").val().trim();
    var username = $("#username").val().trim();
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();

    var goal = parseInt($(".goal:selected").val());
    var pa = parseFloat($(".pa:selected").attr("data-multiplier"));

    var wt = parseInt($("#weight").val());
    var kg = Math.round(wt / 2.2);
    var age = parseInt($("#age").val());
    var gender = $("input[name='gender']:checked").val();
    var feet = parseFloat($("#feet").val());
    var inches = parseFloat($("#inches").val());
    var ht = Math.round((feet * 12 + inches) * 2.54);

    var maintenanceCals = calcCals(kg, pa, age, ht, gender);

    var macros = calcMacros(goal, maintenanceCals, wt);

    macros.fullName = fullName;
    macros.username = username;
    macros.email = email;
    macros.password = password;
    macros.goal = goal;
    macros.gender = gender;
    macros.age = age;
    macros.weight = wt;
    macros.height = ht;
    macros.activityLevel = pa;

    // CHANGE THIS LATER
    macros.name = "test";

    console.log(macros);

    // Send user data to server
    $.ajax({
      url: "/api/createAccount",
      method: "POST",
      data: macros
    }).then(function (data) {
      if (data.url === undefined) {
        alert("Email or username already taken.");
        window.location.replace("/createAccount");
      } else {
        window.location.replace(data.url);
        // return showModal(
        //   "Success!",
        //   "Your profile has been created successfully!<br><a href='/profile'>View profile</a>"
        // );
        return showModal("Oops!", data.message);
      }
    });
  });
});
