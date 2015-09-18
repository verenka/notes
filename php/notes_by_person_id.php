<?php

$id = htmlspecialchars($_GET["id"]);

function notes_by_person_id($id) {
    
  include 'dbconnect.php';  
  $query = "SELECT * FROM Notiz WHERE person_id = ".$id;
  $mysqli_result = mysqli_query($connection, $query);
  
  if (mysqli_num_rows($mysqli_result)==0) { 
      $empty = [
        "msg" => "No notes added yet"
          ];
      return $empty;
  }
  else {
  $notes_list = array();
    
   foreach ($mysqli_result as $row ) {
        $notes_list[] = $row;
    }
  
  return $notes_list;
  
  }
}

echo json_encode(notes_by_person_id($id));