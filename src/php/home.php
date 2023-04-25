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
	
$user = $_GET['user'];

$games = ['tic_tac_toe', 'whack_a_mole', 'hangman', 'memory', 'number_guesser'];

$userScores = [];
$topScores = [];

foreach ($games as $game) {
  // Get the user's scores
  $sql = "SELECT score1, score2, score3 FROM $game WHERE user = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $user);
  $stmt->execute();
  $stmt->bind_result($score1, $score2, $score3);
  $stmt->fetch();
  $stmt->close();

  $userScores[$game] = [
    "score1" => $score1,
    "score2" => $score2,
    "score3" => $score3
  ];

  // Get the top 3 scores for the game
  $sql = "SELECT score1, score2, score3 FROM $game ORDER BY score1 DESC, score2 DESC, score3 DESC LIMIT 3";
  $result = $conn->query($sql);

  $top1 = $top2 = $top3 = null;
  $i = 1;
  while ($row = $result->fetch_assoc()) {
    ${"top" . $i} = $row["score1"];
    $i++;
  }

  $topScores[$game] = [
    "top1" => $top1,
    "top2" => $top2,
    "top3" => $top3
  ];
}

$conn->close();

// Return the scores in JSON format
echo json_encode(["userScores" => $userScores, "topScores" => $topScores]);
?>