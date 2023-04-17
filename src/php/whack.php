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


		$username = '';
$query = "SELECT UserName FROM user_info WHERE id = 1"; // Change the WHERE clause to match the user ID
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
  $row = mysqli_fetch_assoc($result);
  $username = $row['UserName'];
}
?>