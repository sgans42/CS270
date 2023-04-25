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

  // Retrieve score1 from the database
  $sql = "SELECT score1 FROM hangman WHERE user = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $stmt->bind_result($score1);
  $stmt->fetch();
  $stmt->close();

  // Add one to score1
  $score1++;

  // Update score1 in the database
  $sql = "UPDATE hangman SET score1 = ? WHERE user = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("is", $score1, $username);
  $stmt->execute();
  $stmt->close();

  echo "Score1 updated successfully.";

  $conn->close();
?>