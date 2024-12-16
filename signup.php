<?php
include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Save username and plain password
    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        echo "<script>alert('Signup successful!'); window.location.href = 'login.html';</script>";
    } else {
        echo "<script>alert('Signup failed. Please try again.'); window.history.back();</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
