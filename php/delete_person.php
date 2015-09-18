<?php

$id = htmlspecialchars($_GET["id"]);

function delete_person($id) {
include 'dbconnect.php';

$query = "Delete FROM Person WHERE id='".$id."'";
    
    $result = mysqli_query($connection, $query);
  if ($result) {
      echo "ok";
  } else {
      echo "nicht ok";
  }
  
}

function delete_notes($person_id) {
include 'dbconnect.php';

$query = "Delete FROM Notiz WHERE person_id='".$person_id."'";
    
    $result = mysqli_query($connection, $query);
  if ($result) {
      echo "ok";
  } else {
      echo "nicht ok";
  }
    
}

delete_person($id);
delete_notes($id);