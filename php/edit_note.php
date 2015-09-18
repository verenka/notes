<?php

$note_text = htmlspecialchars($_GET["note_text"]);
$tag = htmlspecialchars($_GET["tag"]);
$id = htmlspecialchars($_GET["id"]);

function edit_note($note_text, $tag, $id) {
include 'dbconnect.php';  
  
$query = "UPDATE Notiz SET note_text='".$note_text."', tag='".$tag."' WHERE id =".$id;

$result = mysqli_query($connection, $query);
  
if ($result) {
    echo('ok');
    } else {
      echo('nicht ok');
    }
}

edit_note($note_text, $tag, $id);
