<?php
// 1. Database Configuration
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "dreamhome"; // Matches your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 2. Only process the data if the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Capture and Sanitize form data to prevent SQL injection
    $name    = $conn->real_escape_string($_POST['name']);
    $email   = $conn->real_escape_string($_POST['email']);
    $message = $conn->real_escape_string($_POST['message']);

    // 3. Prepare the SQL query
    // This matches the columns in your 'contact_messages' table
    $sql = "INSERT INTO contact_messages (name, email, message) VALUES ('$name', '$email', '$message')";
    

    // 4. Execute the query
    if ($conn->query($sql) === TRUE) {
        // Success: Show alert and redirect back to the home page section
        echo "<script>
                alert('Success! Your message has been saved to the DreamHome database.');
                window.location.href='index.html#contact';
              </script>";
    } else {
        // Error handling
        echo "Error: " . $conn->error;
    }
} else {
    // 5. If someone tries to access contact.php directly, send them back to index.html
    header("Location: index.html");
    exit();
}
if ($conn->query($sql) === TRUE) {
    echo "<script>
            alert('Success! Your message has been saved to the DreamHome database.');
            window.location.href='http://localhost/dreamhome/index.html#contact';
          </script>";
}
// Close the connection
$conn->close();
?>