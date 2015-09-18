<?php

$word = htmlspecialchars($_GET["word"]);


function get_search_results($word) {
  include 'dbconnect.php';  
  $query = "SELECT * FROM Notiz, Person WHERE "
          . "Person.id = Notiz.person_id"
          . " AND note_text LIKE '%".$word."%'";
  
  $mysqli_result = mysqli_query($connection,$query);
  $search_results = array();
    
    foreach ($mysqli_result as $row ) {
        $search_results[] = $row;
    }

   return $search_results;
  
  }
  echo json_encode(get_search_results($word));
 