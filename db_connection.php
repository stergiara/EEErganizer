<?php
$servername = "localhost";
$username = "stergios";
$password = "poggers123A!";
$dbname = "eeerganizerdb";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
