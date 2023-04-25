<?php
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
        exit();
      }				
      else {
        echo "Incorrect Username";
      }
		}
		elseif ($formClass === 'create-form') { // Handle the create form submission
			$name = $_POST['create_fullName'];
			$username = $_POST['create_username'];


			// Check if the username already exists
			$sql_check = "SELECT * FROM user_info WHERE username = '$username'";
			$result = $conn->query($sql_check);

			if ($result->num_rows > 0) {
				// Username already exists
				echo "This username has already been used";
			}
			else {
				// Insert new user into the database
				$sql_user  = "INSERT INTO user_info (first_name, username)
				VALUES ('$name', '$username')";
				$conn->query($sql_user);

				$sql_tic_tac_toe = "INSERT INTO tic_tac_toe (user) 
				VALUES ('$username')";
				$conn->query($sql_tic_tac_toe);

				$sql_whack_a_mole = "INSERT INTO whack_a_mole (user) 
				VALUES ('$username')";
				$conn->query($sql_whack_a_mole);

        $sql_hangman = "INSERT INTO hangman (user) 
				VALUES ('$username')";
				$conn->query($sql_hangman);

				$sql_memory = "INSERT INTO memory (user) 
				VALUES ('$username')";
				$conn->query($sql_memory);

				$sql_number_guesser = "INSERT INTO number_guesser (user) 
				VALUES ('$username')";
				$conn->query($sql_number_guesser);


				
				if ($conn->query($sql) === TRUE) {
					// Redirect to the home page
          $_SESSION['username'] = $username;
					exit();
				}
				else {

				}
			}
		}
	}	
	$conn->close();
?>