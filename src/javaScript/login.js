// Wait for the DOM to be loaded before attaching event listeners

document.addEventListener('DOMContentLoaded', () => {

  // Get references to the login and create account buttons
  const loginBtn = document.querySelector('#login-btn');
  const createBtn = document.querySelector('#create-btn');

  // Attach event listeners to the buttons
  loginBtn.addEventListener('click', verifyAccount);
  createBtn.addEventListener('click', createAccount);

});



function verifyAccount(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get references to the login input fields
  const fullNameInput = document.querySelector('#login_fullName');
  const usernameInput = document.querySelector('#login_username');

  // Get the values of the input fields
  const fullName = fullNameInput.value.trim();
  const username = usernameInput.value.trim();

  // Verify that the input fields are not empty
  if (!fullName || !username) {
    alert('Please enter a name and a username');
    return;
  }

  // Send a request to the server to verify the account
  // Replace this with your own code to verify the account
  // For demo purposes, we just log the values to the console
  $.ajax({
    type: "POST",
    url: "src/php/login.php",
    data: { 
      class: "login-form",
      login_fullName: fullName,
      login_username: username
    }
  }).done(function(data) {
    // Redirect to the homepage
    window.location.href = 'src/html/home.html';
  }).fail(function() {
    alert('Incorrect name or username');
  });
}

function createAccount(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get references to the create account input fields
  const fullNameInput = document.querySelector('#create_fullName');
  const usernameInput = document.querySelector('#create_username');

  // Get the values of the input fields
  const fullName = fullNameInput.value.trim();
  const username = usernameInput.value.trim();

  // Verify that the input fields are not empty
  if (!fullName || !username) {
    alert('Please enter a name and a username');
    return;
  }

  // Send a request to the server to create the account
  // Replace this with your own code to create the account
  // For demo purposes, we just log the values to the console
  $.ajax({
    type: "POST",
    url: "src/php/login.php",
    data: { 
      class: "create-form",
      create_fullName: fullName,
      create_username: username
    }
  }).done(function(data) {
    // Redirect to the homepage
    window.location.href = 'src/html/home.html';
  }).fail(function() {
    alert('Username already exists');
  });
}

