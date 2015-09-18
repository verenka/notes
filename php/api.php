<?php

include 'dbconnect.php';


// for this example:
// file in dir: /firstrestapp/

function get_person_by_id($id) {
  $person_info = array();

  // ... Data from database
  switch ($id){
    case 1:
      $person_info = array(
          "person_name" => "Jane Doe",
          "person_dateofbirth" => "1980-04-06",
          "person_id" => "1"
      );
      break;
    case 2:
      $person_info = array(
          "person_name" => "John Simpson",
          "person_dateofbirth" => "1983-08-06",
          "person_id" => "2"
      );
      break;
    case 3:
      $person_info = array(
          "person_name" => "Jack Smith",
          "person_dateofbirth" => "1974-01-12",
          "person_id" => "3"
      );
      break;
    case 4:
      $person_info = array(
          "person_name" => "Jenny Brown",
          "person_dateofbirth" => "1982-11-24",
          "person_id" => "4"
      );
      break;
  }

  return $person_info;
}

function get_person_list($order = null, $filter = null) {

  $mysqli_result = mysqli_query($connection, "SELECT * FROM Person");
    $person_list = array();
    
    foreach ($mysqli_result as $row ) {
        $person_list[] = $row;
    }

  return $person_list;
}

$possible_url = array(
  "get_person_list", 
  "get_person"
);

$value = "An error has occurred";

if (isset($_GET["action"]) && in_array($_GET["action"], $possible_url)) {

  switch ($_GET["action"]) {

      case "get_person_list":
        $value = get_person_list();
        break;
  
      case "get_person":
        if (isset($_GET["id"]))
          $value = get_person_by_id($_GET["id"]);
        else
          $value = "Missing argument";
        break;
    }

}

//return JSON array
exit(json_encode($value));

// http://localhost/firstrestapp/api.php?action=get_person
// should be (for a REST URL style)
// http://localhost/firstrestapp/get_person/2
// --> .htaccess (RewriteBase = directory name !!!)
//
// Options +FollowSymLinks -MultiViews
// # Turn mod_rewrite on
// RewriteEngine On
// 
// RewriteBase /firstrestapp/
// RewriteRule ^([^/]*)/([^/]*)$ api.php?action=$1&id=$2 [L]

?>