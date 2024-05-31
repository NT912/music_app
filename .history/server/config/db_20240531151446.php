<?php
$host = 'localhost';
$db = 'music_player';
$user = 'root';
$pass = 'truong912002';

$mysqli = new mysqli($host, $user, $pass, $db);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
?>