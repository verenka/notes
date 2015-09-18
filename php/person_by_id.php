<?php

$id = htmlspecialchars($_GET["id"]);

function person_by_id($id) {
    
  include 'dbconnect.php';  
  $query = "SELECT * FROM Person WHERE id = ".$id;
  $mysqli_result = mysqli_query($connection, $query);
    
  return mysqli_fetch_object($mysqli_result);
  
  
  }
  echo json_encode(person_by_id($id));