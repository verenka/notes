<?php

$tag = htmlspecialchars($_GET["tag"]);

function get_tag_search_results($tag) {
  include 'dbconnect.php';  
  $mysqli_result = mysqli_query($connection, "SELECT * FROM Notiz, Person "
          . "WHERE tag='".$tag."' AND Person.id = Notiz.person_id");
  
  $tag_search_results = array();
    
    foreach ($mysqli_result as $row ) {
        $tag_search_results[] = $row;
    }

   return $tag_search_results;
  
  }
  echo json_encode(get_tag_search_results($tag));