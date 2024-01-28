<?php
var_dump($_POST); // Add this line for debugging
error_reporting(E_ALL);
ini_set('display_errors', true);

include 'db_connection.php';

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
    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "SELECT id, username, email, password FROM total WHERE email='$email'";
    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        if (password_verify($password, $row["password"])) {
            // Successful login
            $userId = $row["id"];

            // Create a session and get the session token
            $sessionToken = createSession($userId);

            // Set the user_id in the session
            session_start();
            $_SESSION['user_id'] = $userId;

            // Set the session token in the session
            $_SESSION['session_token'] = $sessionToken;

            // Debug: Add debug statement to check session data
            var_dump($_SESSION);

            // Regenerate session ID for security
            session_regenerate_id(true);

            // Output the user ID as a JSON response
            echo json_encode(['user_id' => $userId]);

            header('Location: http://localhost/signup_2.html');
            exit();
        } else {
            echo "Incorrect password!";
        }
    } else {
        echo "User not found!";
    }
}

mysqli_close($conn);
?>
