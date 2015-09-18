<?php

$tag = htmlspecialchars($_GET["tag"]);

function get_notes_by_tag($tag) {
    
  include 'dbconnect.php';  
  $query = "SELECT * FROM Notiz, Person WHERE tag = '".$tag."' and Person.id = Notiz.person_id";
  $mysqli_result = mysqli_query($connection, $query);
  
 
  $notes_list = array();
    
   foreach ($mysqli_result as $row ) {
        $notes_list[] = $row;
    }
  
  return $notes_list;
  
}

echo json_encode(get_notes_by_tag($tag));