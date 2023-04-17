<?php
  ob_start();
  session_start();

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "score";
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}


// Check if the session variable is set
if (isset($_SESSION['username'])) {
  // Get the username from the session variable
  $username = $_SESSION['username'];

  // Use the username in your code
  echo "Welcome, $username!";
}
else {
  // Redirect to the login page
  header("Location: login.php");
  exit();
}


	$conn->close();

?>