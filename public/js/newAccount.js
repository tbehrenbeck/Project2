// GLOBAL VARIABLES
var fullName = "";
var email = "";
var username = "";
var password = "";
var validated = false;
var currentTab = 0; // Current tab is set to be the first tab (0)

// FUNCTIONS -- user profile validation functions
// FULL NAME VALIDATION: Rejects inputs in the following cases: input is blank || contains any character other than letters
function validateFullName() {
  if (fullName == "") {
    validated = false;
    alert("Error: Full name cannot be blank!");
    return false;
  }
}

// EMAIL VALIDATION: Rejects inputs in the following cases: @ is not present || starts with dot "." || no character before @ || any character other than a letter, digit, underscore, or dash is present || double dots present
function validateEmail() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true);
  }
  else {
    validated = false;
    alert("Error: Please enter a valid email address!");
    return (false);
  }
}

// USERNAME VALIDATION: Rejects input in the following cases: input is blank || contains any character other than letters, numbers, and undersores
function validateUsername() {
  if (username == "") {
    validated = false;
    alert("Error: Username cannot be blank!");
    return false;
  }
  re = /^\w+$/;
  if (!re.test(username)) {
    validated = false;
    alert("Error: Username may contain only letters, numbers, and underscores!");
    return false;
  }
}

// PASSWORD VALIDATION: Rejects inputs in the following cases: input is blank || is less than 6 characters || is the same as the username || does not contain at least one number || does not contain at least one uppercase letter || does not contain at least one lowercase letter

function validatePassword() {
  if (password == "") {
    validated = false;
    alert("Error: Password cannot be blank!");
    return false;
  }
  if (password.length < 6) {
    validated = false;
    alert("Error: Password must contain at least six characters!");
    return false;
  }
  if (password == username) {
    validated = false;
    alert("Error: Password must be different from Username!");
    return false;
  }
  re = /[0-9]/;
  if (!re.test(password)) {
    validated = false;
    alert("Error: password must contain at least one number (0-9)!");
    return false;
  }
  re = /[a-z]/;
  if (!re.test(password)) {
    validated = false;
    alert("Error: password must contain at least one lowercase letter (a-z)!");
    return false;
  }
  re = /[A-Z]/;
  if (!re.test(password)) {
    validated = false;
    alert("Error: password must contain at least one uppercase letter (A-Z)!");
    return false;
  }
}

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n === x.length - 1) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("nextBtn").removeAttribute("onclick");
    document.getElementById("submitBtn").style.display = "inline";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value === "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

// function to validate each user profile input
function validateAll() {
  validated = true;
  validateFullName();
  validateEmail();
  validateUsername();
  validatePassword();
  console.log("validated = " + validated);
}

// Functions to display correct tabs
function nextPrev(n) {
  // This function will figure out which tab to display
  fullName = $("#fullName").val().trim();
  username = $("#username").val().trim();
  email = $("#email").val().trim();
  password = $("#password").val().trim();
  console.log("fullName" + fullName);
  validateAll();
  var x = document.getElementsByClassName("tab");
  console.log("n = " + n);
  // Exit the function if any field in the current tab is invalid:
  if ((n === 1 && !validateForm()) || (validated === false)) {
    console.log("function stopped");
    return false;
  }
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

//LOGIC
showTab(currentTab); // Display the current tab