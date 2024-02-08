<?php

// Assuming you have a database connection
include("db_connection.php");

/**
 * @var string $conn
 */

session_start();

if (isLoggedIn()) {
    // Retrieve the user ID from the session
    $userId = $_SESSION['user_id'];

    // Initialize the variable
    $i1 = 0;
    $i2 = 0;
    $i3 = 0;
    $i4 = 0;
    $i5 = 0;
    $i6 = 0;
    $i7 = 0;
    $i8 = 0;
    $i9 = 0;

    // Fetch the column names from the total table
    $columnQuery = "SHOW COLUMNS FROM total";
    $columnResult = $conn->query($columnQuery);

    // Initialize an array to store column values
    $columnValues = [];

    // Iterate through the columns
    while ($columnRow = $columnResult->fetch_assoc()) {
        $columnName = $columnRow['Field'];

        // Check if the column name starts with the digit 1
        if (strpos($columnName, '1') === 0) {
            // Fetch the value of the cell in the user_id row
            $cellQuery = "SELECT `$columnName` FROM total WHERE ID = $userId";

            $cellResult = $conn->query($cellQuery);

            if ($cellResult) {
                // Fetch the row from the result
                $row = $cellResult->fetch_row();

                if ($row !== null) {
                    $cellValue = $row[0];

                    // Check if the cell has a non-NULL value
                    if ($cellValue !== NULL) {
                        // Increment the variable
                        $i1++;

                        // Add the cell value to the array
                        $columnValues[$columnName] = $cellValue;
                    }
                } else {
                    echo "Row is null.\n";  // Debugging line
                }
            } else {
                echo "Cell query failed.\n";  // Debugging line
            }
        }
        if (strpos($columnName, '2') === 0) {
            // Fetch the value of the cell in the user_id row
            $cellQuery = "SELECT `$columnName` FROM total WHERE ID = $userId";

            $cellResult = $conn->query($cellQuery);

            if ($cellResult) {
                // Fetch the row from the result
                $row = $cellResult->fetch_row();

                if ($row !== null) {
                    $cellValue = $row[0];

                    // Check if the cell has a non-NULL value
                    if ($cellValue !== NULL) {
                        // Increment the variable
                        $i2++;

                        // Add the cell value to the array
                        $columnValues[$columnName] = $cellValue;
                    }
                } else {
                    echo "Row is null.\n";  // Debugging line
                }
            } else {
                echo "Cell query failed.\n";  // Debugging line
            }
        }
        if (strpos($columnName, '3') === 0) {
            // Fetch the value of the cell in the user_id row
            $cellQuery = "SELECT `$columnName` FROM total WHERE ID = $userId";

            $cellResult = $conn->query($cellQuery);

            if ($cellResult) {
                // Fetch the row from the result
                $row = $cellResult->fetch_row();

                if ($row !== null) {
                    $cellValue = $row[0];

                    // Check if the cell has a non-NULL value
                    if ($cellValue !== NULL) {
                        // Increment the variable
                        $i3++;

                        // Add the cell value to the array
                        $columnValues[$columnName] = $cellValue;
                    }
                } else {
                    echo "Row is null.\n";  // Debugging line
                }
            } else {
                echo "Cell query failed.\n";  // Debugging line
            }
        }
        if (strpos($columnName, '4') === 0) {
            // Fetch the value of the cell in the user_id row
            $cellQuery = "SELECT `$columnName` FROM total WHERE ID = $userId";

            $cellResult = $conn->query($cellQuery);

            if ($cellResult) {
                // Fetch the row from the result
                $row = $cellResult->fetch_row();

                if ($row !== null) {
                    $cellValue = $row[0];

                    // Check if the cell has a non-NULL value
                    if ($cellValue !== NULL) {
                        // Increment the variable
                        $i4++;

                        // Add the cell value to the array
                        $columnValues[$columnName] = $cellValue;
                    }
                } else {
                    echo "Row is null.\n";  // Debugging line
                }
            } else {
                echo "Cell query failed.\n";  // Debugging line
            }
        }
        if (strpos($columnName, '5') === 0) {
            // Fetch the value of the cell in the user_id row
            $cellQuery = "SELECT `$columnName` FROM total WHERE ID = $userId";

            $cellResult = $conn->query($cellQuery);

            if ($cellResult) {
                // Fetch the row from the result
                $row = $cellResult->fetch_row();

                if ($row !== null) {
                    $cellValue = $row[0];

                    // Check if the cell has a non-NULL value
                    if ($cellValue !== NULL) {
                        // Increment the variable
                        $i5++;

                        // Add the cell value to the array
                        $columnValues[$columnName] = $cellValue;
                    }
                } else {
                    echo "Row is null.\n";  // Debugging line
                }
            } else {
                echo "Cell query failed.\n";  // Debugging line
            }
        }
        if (strpos($columnName, '6') === 0) {
            // Fetch the value of the cell in the user_id row
            $cellQuery = "SELECT `$columnName` FROM total WHERE ID = $userId";

            $cellResult = $conn->query($cellQuery);

            if ($cellResult) {
                // Fetch the row from the result
                $row = $cellResult->fetch_row();

                if ($row !== null) {
                    $cellValue = $row[0];

                    // Check if the cell has a non-NULL value
                    if ($cellValue !== NULL) {
                        // Increment the variable
                        $i6++;

                        // Add the cell value to the array
                        $columnValues[$columnName] = $cellValue;
                    }
                } else {
                    echo "Row is null.\n";  // Debugging line
                }
            } else {
                echo "Cell query failed.\n";  // Debugging line
            }
        }
        if (strpos($columnName, '7') === 0) {
            // Fetch the value of the cell in the user_id row
            $cellQuery = "SELECT `$columnName` FROM total WHERE ID = $userId";

            $cellResult = $conn->query($cellQuery);

            if ($cellResult) {
                // Fetch the row from the result
                $row = $cellResult->fetch_row();

                if ($row !== null) {
                    $cellValue = $row[0];

                    // Check if the cell has a non-NULL value
                    if ($cellValue !== NULL) {
                        // Increment the variable
                        $i7++;

                        // Add the cell value to the array
                        $columnValues[$columnName] = $cellValue;
                    }
                } else {
                    echo "Row is null.\n";  // Debugging line
                }
            } else {
                echo "Cell query failed.\n";  // Debugging line
            }
        }
        if (strpos($columnName, '8') === 0) {
            // Fetch the value of the cell in the user_id row
            $cellQuery = "SELECT `$columnName` FROM total WHERE ID = $userId";

            $cellResult = $conn->query($cellQuery);

            if ($cellResult) {
                // Fetch the row from the result
                $row = $cellResult->fetch_row();

                if ($row !== null) {
                    $cellValue = $row[0];

                    // Check if the cell has a non-NULL value
                    if ($cellValue !== NULL) {
                        // Increment the variable
                        $i8++;

                        // Add the cell value to the array
                        $columnValues[$columnName] = $cellValue;
                    }
                } else {
                    echo "Row is null.\n";  // Debugging line
                }
            } else {
                echo "Cell query failed.\n";  // Debugging line
            }
        }
        if (strpos($columnName, '9') === 0) {
            // Fetch the value of the cell in the user_id row
            $cellQuery = "SELECT `$columnName` FROM total WHERE ID = $userId";

            $cellResult = $conn->query($cellQuery);

            if ($cellResult) {
                // Fetch the row from the result
                $row = $cellResult->fetch_row();

                if ($row !== null) {
                    $cellValue = $row[0];

                    // Check if the cell has a non-NULL value
                    if ($cellValue !== NULL) {
                        // Increment the variable
                        $i9++;

                        // Add the cell value to the array
                        $columnValues[$columnName] = $cellValue;
                    }
                } else {
                    echo "Row is null.\n";  // Debugging line
                }
            } else {
                echo "Cell query failed.\n";  // Debugging line
            }
        }
    }


    header('Content-Type: application/json');

    header('Content-Type: application/json');
    echo json_encode([
        'i1' => $i1,
        'i2' => $i2,
        'i3' => $i3,
        'i4' => $i4,
        'i5' => $i5,
        'i6' => $i6,
        'i7' => $i7,
        'i8' => $i8,
        'i9' => $i9,
        'column_values' => $columnValues
    ]);

} else {
    header('HTTP/1.1 401 Unauthorized');
    echo "User is not logged in";
}

$conn->close();

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}
?>
