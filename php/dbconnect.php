<?php
$host = "localhost";
$username = "notes";
$password = "mynotes";
$dbname = "notes";

$connection = mysqli_connect($host, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
} 

?>