<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "score";

	// Create a new MySQL connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check if the connection is successful
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$username = $_POST['username'];

	// Prepare a SQL statement to select the user's score
	$sql = "SELECT score1 FROM tic_tac_toe WHERE user = ?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param("s", $username);
	$stmt->execute();
	$stmt->bind_result($score1);
	$stmt->fetch();
	$stmt->close();

	// Prepare a SQL statement to select the top 3 scores
	$sql = "SELECT score1 FROM tic_tac_toe ORDER BY score1 DESC LIMIT 3";
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	$stmt->bind_result($top_score1);

	// Store the top scores in an array
	$top_scores = array();
	while ($stmt->fetch()) {
		array_push($top_scores, $top_score1);
	}

	$stmt->close();
	$conn->close();

	// Output the user score and top scores as a JSON object
	echo json_encode(array("user_score" => $score1, "top_scores" => $top_scores));
?>