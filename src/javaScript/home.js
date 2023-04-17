// Get the username from the .username element
const usernameEl = document.querySelector('.username');
const username = usernameEl ? usernameEl.textContent : '';

// Update the .username element with the logged-in user's username
if (usernameEl) {
  usernameEl.textContent = "<?php echo $_SESSION['username']; ?>";
}