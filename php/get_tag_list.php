<?php

function get_tag_list() {
  include 'dbconnect.php';  
  $mysqli_result = mysqli_query($connection, "SELECT tag as tagname, concat(tag, ' (', COUNT(tag), ')') as tag FROM Notiz GROUP BY tag");
  $tag_list = array();
    
    foreach ($mysqli_result as $row ) {
        $tag_list[] = $row;
    }

   return $tag_list;
  
  }
  echo json_encode(get_tag_list());