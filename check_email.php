<?php
// Assuming you have a database connection already established

include("db_connection.php");

/**
 * @var string $conn
 */

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["email"])) {
    $email = $_POST["email"];

    // Query to check if the email exists in the database using a prepared statement
    $query = "SELECT email FROM total WHERE email = ?";

    // Create a prepared statement
    $stmt = mysqli_prepare($conn, $query);

    if ($stmt) {
        // Bind the parameters
        mysqli_stmt_bind_param($stmt, "s", $email);

        // Execute the statement
        mysqli_stmt_execute($stmt);

        // Bind the result variables
        mysqli_stmt_bind_result($stmt, $resultEmail);

        // Fetch the result
        mysqli_stmt_fetch($stmt);

        // Check if the email exists
        if (!empty($resultEmail)) {
            echo "exists";
        } else {
            // Email does not exist in the database
            echo "not_exists";
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        // Error in preparing the statement
        echo "error: " . mysqli_error($conn);
    }
} else {
    // Invalid request
    echo "invalid_request";
}

// Close the database connection (optional, depending on your application structure)
mysqli_close($conn);
?>
