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

	$sql = "SELECT score1, score2, score3 FROM whack_a_mole WHERE user = ?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param("s", $username);
	$stmt->execute();
	$stmt->bind_result($score1, $score2, $score3);
	$stmt->fetch();
	$stmt->close();

	$sql = "SELECT score1 FROM whack_a_mole ORDER BY score1 DESC LIMIT 3";
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	$stmt->bind_result($top_score1);

	$top_scores = array();
	while ($stmt->fetch()) {
		array_push($top_scores, $top_score1);
	}

	$stmt->close();
	$conn->close();

	echo json_encode(array("user_scores" => array("score1" => $score1, "score2" => $score2, "score3" => $score3), "top_scores" => $top_scores));
?>