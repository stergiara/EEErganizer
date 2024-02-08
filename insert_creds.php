<?php

ob_start();
include("db_connection.php");

// Start the session
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

/**
 * @var string $conn
 */

// Function to get the user ID from the sessions table based on the session token
function getUserIdFromSession($sessionToken) {
    global $conn;

    $currentTime = date('Y-m-d H:i:s');

    // Query to get the user ID based on the session token
    $query = "SELECT user_id FROM sessions WHERE session_token = ? AND expiration_time > ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ss", $sessionToken, $currentTime);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $userId = $row["user_id"];
        return $userId;
    } else {
        return false;
    }

    mysqli_stmt_close($stmt);
}

// Check if the session token is set
if (isset($_SESSION['session_token'])) {
    // Retrieve the session token from the user's session
    $sessionToken = $_SESSION['session_token'];

    // Get the current user's ID based on the session token
    $userId = getUserIdFromSession($sessionToken);

    if ($userId !== false) {
        // User is authenticated, you can proceed with the form logic

        // Assuming you have obtained these values from your form data
        $surname = $_POST['surname'];
        $term = $_POST['term'];
        $course = $_POST['course'];

        // Assuming your table has an auto-increment ID column and other columns
        // you want to update (e.g., col1, col2, ...).
        // Make sure to adjust the column names accordingly.

        // Update the user's data with the obtained user ID
        $sql = "UPDATE total SET surname = ?, term = ?, course = ? WHERE id = ?";

        $stmt = mysqli_prepare($conn, $sql);

        mysqli_stmt_bind_param($stmt, "siii", $surname, $term, $course, $userId);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_affected_rows($stmt) > 0) {
            session_start();
            header('Location: http://localhost/signup_3.html');
            exit();
        } else {
            echo "Failed to update data: " . mysqli_error($conn);
        }

        mysqli_stmt_close($stmt);
    } else {
        // Invalid session token or session expired
        echo "Invalid session token or session expired";
    }
} else {
    // Session token is not set, handle this case as needed
    echo "Session token is not set";
}

mysqli_close($conn);
ob_end_flush();
?>

