<?php
// Replace 'testpassword' with the actual password you want to hash
$plain_password = 'testpassword';

// Generate the hashed password using Bcrypt algorithm (default for PASSWORD_DEFAULT)
$hashed_password = password_hash($plain_password, PASSWORD_DEFAULT);

echo "Hashed Password: " . $hashed_password;
?>
