<?php
// Include your database connection configuration file
include 'db_connection.php'; // Adjust the file name as per your actual configuration

/**
 * @var string $conn
 * @var string $pdo
 */

// Retrieve the user ID sent via POST request
$userId = $_POST['userId'];

// Prepare and execute the query to fetch class data for the user
$stmt = $pdo->prepare("SELECT * FROM your_table_name WHERE user_id = ?");
$stmt->execute([$userId]);
$classData = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Prepare an array to hold information about which columns contain integers
$integerColumns = array();

// Iterate through the fetched data
foreach ($classData as $row) {
    foreach ($row as $column => $value) {
        // Check if the value is an integer or NULL
        if (is_numeric($value)) {
            // If it's an integer, add the column name to the $integerColumns array
            $integerColumns[$column] = true;
        }
    }
}

// Return the column information as JSON response
header('Content-Type: application/json');
echo json_encode($integerColumns);
?>
