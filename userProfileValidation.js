// FOR FUTURE DEVELOPMENT

// GLOBAL VARIABLES
var fullName = "";
var email = "";
var username = "";
var password = "";
var validated = true;

// FUNCTIONS -- user profile validation functions
// FULL NAME VALIDATION: Rejects inputs in the following cases: input is blank || contains any character other than letters
function validateFullName() {
  if (fullName == "") {
    validated = false;
    alert("Error: Full name cannot be blank!");
    return false;
  }
  letters = /^[A-Za-z]+$/;
  if (!fullName.match(letters)) {
    validated = false;
    alert("Full Name may only contain letters");
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

// function to validate each user profile input
function validateAll() {
  validated = true;
  validateFullName();
  validateEmail();
  validateUsername();
  validatePassword();
  console.log("validated = " + validated);
  if (validated = false) {
    return;
  }
}