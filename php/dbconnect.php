<?php
$host = "localhost";
$username = "root";
$password = "personnotes";
$dbname = "SPEZUE_Notes";

$connection = mysqli_connect($host, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
} 

?>