<?php
$picturesList = "pictures.json";
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($picturesList);
?>