<?php
$fname = htmlspecialchars($_GET["fname"]);
$lname = htmlspecialchars($_GET["lname"]);
$picture = htmlspecialchars($_GET["picture"]);

function add_person($fname, $lname, $picture) {
include 'dbconnect.php';  
  
$query = "INSERT INTO Person (id, fname, lname, picture) VALUES (NULL,'".$fname."', '".$lname."', '".$picture."')";

$result = mysqli_query($connection, $query);
  
if ($result) {
      echo "ok";
    } else {
      echo "nicht ok";
    }
}

  add_person($fname, $lname, $picture);