<?php

$id = htmlspecialchars($_GET["id"]);
$fname = htmlspecialchars($_GET["fname"]);
$lname = htmlspecialchars($_GET["lname"]);

function edit_person($id, $fname, $lname) {
    include 'dbconnect.php';  
  
    $query = "UPDATE Person SET fname='".$fname."', lname='".$lname."' WHERE id=".$id;
    
    $result = mysqli_query($connection, $query);
  if ($result) {
      echo "ok";
  } else {
      echo "nicht ok";
  }
  }

  edit_person($id, $fname, $lname);
