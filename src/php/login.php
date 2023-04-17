<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");
  ob_start();
  
  // Start the session
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


	if (isset($_POST['class'])) {
		$formClass = $_POST['class'];
			
		if ($formClass === 'login-form') { // Handle the login form submission

			// Get the form data
			$fullName = $_POST['login_fullName'];
			$username = $_POST['login_username'];

			// Check if the username already exists
			$sql_check = "SELECT * FROM user_info WHERE UserName = '$username'";
			$result = $conn->query($sql_check);

			if ($result->num_rows > 0) {
				// Username already exists
        $_SESSION['username'] = $username;
        header("Location: ../html/home.html");
        exit();
      }				
      else {
        echo "Incorrect Username";
      }

			//add in the account verification here

		}
		elseif ($formClass === 'create-form') { // Handle the create form submission
			$name = $_POST['create_fullName'];
			$username = $_POST['create_username'];


			// Check if the username already exists
			$sql_check = "SELECT * FROM user_info WHERE UserName = '$username'";
			$result = $conn->query($sql_check);

			if ($result->num_rows > 0) {
				// Username already exists
				echo "This username has already been used";
			}
			else {
				// Insert new user into the database
				$sql = "INSERT INTO user_info (FirstName, UserName)
				VALUES ('$name', '$username')";
				
				if ($conn->query($sql) === TRUE) {
					// Redirect to the home page
          $_SESSION['username'] = $username;
					header("Location: ../html/home.html");
					exit();
				}
				else {
					echo "Error: " . $sql . "<br>" . $conn->error;
				}
			}
		}
	}	
	$conn->close();
?>