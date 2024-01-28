<?php

include("db_connection.php");

/**
 * @var string $conn
 */

// Function to generate a random session token
function generateSessionToken() {
    return bin2hex(random_bytes(32)); // Adjust the length as needed
}

// Function to create and store a session for the user
function createSession($userId) {
    global $conn;

    // Generate a session token
    $sessionToken = generateSessionToken();

    // Set expiration time (e.g., 1 hour from now)
    $expirationTime = date('Y-m-d H:i:s', strtotime('+6 hours'));

    // Insert the session information into the database
    $insertQuery = "INSERT INTO sessions (user_id, session_token, expiration_time) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($insertQuery);
    $stmt->bind_param("iss", $userId, $sessionToken, $expirationTime);

    // Execute the prepared statement
    $stmt->execute();

    // Close the statement
    $stmt->close();

    // Return the session token
    return $sessionToken;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_BCRYPT);
    $email = $_POST["email"];

    $tableName = "total";

    $sql = "INSERT INTO $tableName (username, password, email) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "sss", $username, $password, $email);

        if (mysqli_stmt_execute($stmt)) {
            // Registration successful
            // Get the user ID of the newly registered user
            $userId = mysqli_insert_id($conn);

            // Create a session and get the session token
            $sessionToken = createSession($userId);

            // Output a message with the session token (for testing purposes)
            header("Location: http://localhost/authentication_2.html");
            exit();
        } else {
            error_log("Error executing statement: " . mysqli_stmt_error($stmt));
            echo "Registration failed. Please try again.";
        }

        mysqli_stmt_close($stmt);
    } else {
        error_log("Error preparing statement: " . mysqli_error($conn));
        echo "Registration failed. Please try again.";
    }
}

mysqli_close($conn);
?>
