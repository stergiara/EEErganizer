<?php

session_start(); // Start the session
error_reporting(E_ALL);
ini_set('display_errors', true);

// ... your existing code ...

// Debugging: Print the session token
echo "Session Token: " . $_SESSION['session_token'];

include("db_connection.php");

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

// Get the JSON data sent from the JavaScript
$data = json_decode(file_get_contents("php://input"), true);

if (isset($_SESSION['session_token'])) {
    // Retrieve the session token from the user's session
    $sessionToken = $_SESSION['session_token'];

    // Get the user ID based on the session token
    $userId = getUserIdFromSession($sessionToken);

    if ($userId !== false) {
        // Iterate through the data and update the corresponding rows
        foreach ($data as $row) {
            $code = $row['code'];
            $value = $row['value'];

            // Assuming "total" is the name of your SQL table
            $sql = "UPDATE total SET `$code` = $value WHERE id = $userId";

            if (mysqli_query($conn, $sql)) {
                // Data updated successfully
            } else {
                echo "Error updating record: " . mysqli_error($conn);
            }
        }
    } else {
        echo "Invalid session token";
    }
} else {
    echo "Invalid data format";
}

mysqli_close($conn);

?>
