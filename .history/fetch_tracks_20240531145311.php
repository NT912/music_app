<?php
require 'config/db.php';

$stmt = $pdo->query("SELECT * FROM tracks");
$tracks = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($tracks);
?>
