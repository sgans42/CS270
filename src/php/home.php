<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "score";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

if (!isset($_GET['user'])) {
    echo json_encode(["error" => "User not provided"]);
    exit();
}

$username = $_GET['user'];

$games = ['tic_tac_toe', 'whack_a_mole', 'hangman', 'memory', 'number_guesser'];

$userScores = [];
$topScores = [];

foreach ($games as $game) {
    $numScores = 3;

    if ($game === 'tic_tac_toe' || $game === 'hangman') {
        $numScores = 1;
    }

    $sql = "SELECT " . implode(',', array_map(fn($i) => "score{$i}", range(1, $numScores))) . " FROM $game WHERE user = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result(...array_map(fn($i) => ${"score{$i}"}, range(1, $numScores)));
    $stmt->fetch();
    $stmt->close();

    $userScores[$game] = array_combine(array_map(fn($i) => "score{$i}", range(1, $numScores)), array_map(fn($i) => ${"score{$i}"}, range(1, $numScores)));

    $sql = "SELECT " . implode(',', array_map(fn($i) => "score{$i}", range(1, $numScores))) . " FROM $game ORDER BY " . implode(', ', array_map(fn($i) => "score{$i} DESC", range(1, $numScores))) . " LIMIT 3";
    $result = $conn->query($sql);

    $top = [];
    while ($row = $result->fetch_assoc()) {
        for ($i = 1; $i <= $numScores; $i++) {
            $top["top{$i}"] = $row["score{$i}"];
        }
    }

    $topScores[$game] = $top;
}

$conn->close();

echo json_encode(["userScores" => $userScores, "topScores" => $topScores]);
?>