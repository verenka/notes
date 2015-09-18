<?php
$note_text = htmlspecialchars($_GET["note_text"]);
$tag = htmlspecialchars($_GET["tag"]);
$person_id = htmlspecialchars($_GET["person_id"]);

function add_note($note_text, $tag, $person_id) {
include 'dbconnect.php';  
  
$query = "INSERT INTO Notiz (id, date, note_text, tag, person_id ) VALUES (NULL, NULL, '".$note_text."', '".$tag."', '".$person_id."')";

$result = mysqli_query($connection, $query);
  
if ($result) {
      echo "ok";
    } else {
      echo "nicht ok";
    }
}

  add_note($note_text, $tag, $person_id);