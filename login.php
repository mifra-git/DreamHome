<?php
session_start();
include "db.php";

$email = $_POST['email'];
$password = $_POST['password'];

// 🛑 OLD QUERY (Potentially case-sensitive depending on DB settings)
// $sql = "SELECT * FROM users WHERE email=?";

// ✅ NEW ROBUST QUERY (Forces case-insensitive comparison using BINARY or simply converts both to lowercase)
// Method 1 (Best for MySQL): Use LOWER()
$sql = "SELECT * FROM users WHERE LOWER(email) = LOWER(?)"; 

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email); // The user-provided email is still bound here
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();

    // Check if the hashed password matches
    if (password_verify($password, $row['password'])) {
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['email'] = $row['email'];
        echo "success";
    } else {
        echo "invalid"; // Incorrect password
    }
} else {
    echo "invalid"; // User not found (often due to case sensitivity)
}
?>