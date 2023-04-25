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

  $username = $_POST['username'];
  $score = $_POST['attempts'];
  // Retrieve scores from the database
  $sql = "SELECT score1, score2, score3 FROM number_guesser WHERE user = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $stmt->bind_result($score1, $score2, $score3);
  $stmt->fetch();
  $stmt->close();

  // Check if the new score is lower than any of the existing scores
  if ($score < $score1 || $score < $score2 || $score < $score3) {
    // Create an array of scores and sort in ascending order
    $scores = array($score1, $score2, $score3, $score);
    sort($scores);

    // Update the top 3 lowest scores in the database
    $sql = "UPDATE number_guesser SET score1 = ?, score2 = ?, score3 = ? WHERE user = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiis", $scores[0], $scores[1], $scores[2], $username);
    $stmt->execute();
    $stmt->close();

    echo "Lowest scores updated successfully.";
  } else {
    echo "New score is not a low score.";
  }

  $conn->close();
?>