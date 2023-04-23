<?php
//dont edit anything under here
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
	
	$username = $_POST['username'];
//dont edit anything above here

//Tic Tac Toe methods



//Whack a Mole methods


	$sql = "SELECT * FROM whack_a_mole WHERE user = '$username'";
	$result = $conn->query($sql);
	$row = $result->fetch_assoc();
	$whack_user_score1 = $row["score1"];
	$whack_user_score2 = $row["score2"];
	$whack_user_score3 = $row["score3"];

	$sql = "SELECT score1, score2, score3 FROM whack_a_mole ORDER BY score1 DESC, score2 DESC, score3 DESC LIMIT 3";
	$result += $conn->query($sql);


	// Return the scores as a JSON-encoded response
	$response = array(
		"score1" => $score1,
		"score2" => $score2,
		"score3" => $score3
	);








//dont edit anything under here
	$conn->close();
?>