<?php
// Start the session to check if the user is logged in
session_start();

// Include database connection file (assumes 'db.php' initializes $conn)
include "db.php"; 

// Check for database connection error
if (!$conn) {
    // Return a generic error message or log the specific mysqli_connect_error()
    echo "Error saving booking. Please check database connection.";
    exit();
}

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo "not_logged_in";
    exit();
}

// Get the user ID from the session
$user_id = $_SESSION['user_id'];

// Get POST data sent from the JavaScript fetch request
$property_name = $_POST['property_name'] ?? '';
$booking_date = $_POST['booking_date'] ?? '';
$message = $_POST['message'] ?? '';

// Basic server-side validation
if (empty($property_name) || empty($booking_date)) {
    echo "Error: Missing property name or date.";
    exit();
}

// Use prepared statements for security (preventing SQL injection)
$sql = "INSERT INTO bookings (user_id, property_name, booking_date, message, created_at) VALUES (?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    // Handle error if the statement preparation fails (e.g., wrong table/column names)
    error_log("Prepare failed: " . $conn->error);
    echo "Error saving booking. (Prepare Failed)";
    exit();
}

// Bind the parameters: 'isss' stands for (integer, string, string, string)
// corresponding to (user_id, property_name, booking_date, message)
$stmt->bind_param("isss", $user_id, $property_name, $booking_date, $message);

if ($stmt->execute()) {
    // Success response expected by booking.js
    echo "success";
} else {
    // Log and return the execution error
    error_log("Execute failed: " . $stmt->error);
    echo "Error saving booking. (Execute Failed)";
}

$stmt->close();
$conn->close();

?>