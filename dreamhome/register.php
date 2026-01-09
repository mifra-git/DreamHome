<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "db.php";

if (!$conn) {
    die("DB connection failed");
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if ($name == '' || $email == '' || $password == '') {
    die("Empty fields received");
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");

if (!$stmt) {
    die("Prepare failed: " . $conn->error);
}

$stmt->bind_param("sss", $name, $email, $hashedPassword);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "Execute failed: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
