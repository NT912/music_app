<?php
require 'config/db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    die("Bạn cần đăng nhập để lưu bài hát.");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $track_id = $_POST['track_id'];
    $user_id = $_SESSION['user_id'];

    $stmt = $pdo->prepare("INSERT INTO saved_tracks (id, id_user) VALUES (:track_id, :user_id)");
    $stmt->bindParam(':track_id', $track_id);
    $stmt->bindParam(':user_id', $user_id);

    if ($stmt->execute()) {
        echo "Bài hát đã được lưu!";
    } else {
        echo "Lưu bài hát thất bại.";
    }
}
?>
