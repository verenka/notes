<?php
$id = htmlspecialchars($_GET["id"]);

function delete_note($id) {
include 'dbconnect.php';

$query = "Delete FROM Notiz WHERE id=".$id;
    
    $result = mysqli_query($connection, $query);
  if ($result) {
      echo "ok";
  } else {
      echo "nicht ok";
  }
    
}

delete_note($id);