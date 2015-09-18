<?php

function person_list() {
  include 'dbconnect.php';  
  $mysqli_result = mysqli_query($connection, "SELECT * FROM Person ORDER by fname DESC ");
  $person_list = array();
    
    foreach ($mysqli_result as $row ) {
        $person_list[] = $row;
    }

   return $person_list;
  
  }
  echo json_encode(person_list());