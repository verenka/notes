<?php

$id = htmlspecialchars($_GET["id"]);

function get_note_by_note_id($id) {
    
  include 'dbconnect.php';  
  $query = "SELECT * FROM Notiz WHERE id = ".$id;
  $mysqli_result = mysqli_query($connection, $query);
  
  return mysqli_fetch_object($mysqli_result);
  
}

echo json_encode(get_note_by_note_id($id));