<?php
// check_login_status.php

session_start();

// Check if the user is logged in
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Output the login status as a JSON response
echo json_encode(['isLoggedIn' => isLoggedIn()]);
?>
