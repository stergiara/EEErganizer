document.addEventListener("DOMContentLoaded", function () {
    var loginLink = document.getElementById("loginLink");
    var signupLink = document.getElementById("signupLink");

    // Function to update login status
    function updateLoginStatus() {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "check_login_status.php", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);

                if (response.isLoggedIn) {
                    // User is logged in
                    loginLink.textContent = "Account";
                    signupLink.textContent = "Log Out";
                    loginLink.href = "account.html";  // Update href accordingly
                    signupLink.href = "#"; // Update href accordingly
                } else {
                    // User is not logged in
                    loginLink.textContent = "Login";
                    signupLink.textContent = "Sign Up";
                    loginLink.href = "login.html";
                    signupLink.href = "signup.html";
                }
            }
        };

        xhr.onerror = function () {
            console.error("Network error");
        };

        xhr.send();
    }

    // Initial update on page load
    updateLoginStatus();
});




document.addEventListener("DOMContentLoaded", function () {
    var table = document.getElementById("tableId");
    var totalHoursElement = document.getElementById("totalHours");
    var labHoursElement = document.getElementById("labHours");
    var subjectCountElement = document.getElementById("subjectCount");

    var totalHours = 0;
    var totalLabHours = 0;
    var subjectCount = 0;

    table.addEventListener("click", function (e) {
        var row = e.target.parentNode;

        if (row.tagName === "TR") {
            var isPicked = row.classList.contains("picked");

            var rowData = row.cells;
            var name = rowData[1].innerText;
            var termString = rowData[2].innerText;
            var term = parseInt(termString, 10);
            var hoursString = rowData[3].innerText;
            var hours = parseInt(hoursString, 10);
            var labHoursString = rowData[4].innerText;
            var labHours = parseInt(labHoursString, 10);
            console.log("Name: " + name + ", Term: " + term + ", Hours: " + hours);

            if (!isPicked) {
                totalHours += hours;
                totalLabHours += labHours;
                subjectCount++;
                row.classList.add("picked");
            } else {
                totalHours -= hours;
                totalLabHours -= labHours;
                subjectCount--;
                row.classList.remove("picked");
            }

            // Display the updated totals and row count in the footer
            totalHoursElement.textContent = "Σύνολο ωρών: " + totalHours;
            labHoursElement.textContent = "Εργαστηριακές ώρες: " + totalLabHours;
            subjectCountElement.textContent = "Σύνολο μαθημάτων: " + subjectCount;
        }
    });

    var checkList = document.getElementById("checkList");
    var notLoggedPopup = document.getElementById("notLoggedPopup");
    var closeNotLoggedPopup = document.getElementById("closeNotLoggedPopup");

    checkList.addEventListener("click", function () {
        notLoggedPopup.style.display = "block";
    });

    closeNotLoggedPopup.addEventListener("click", function () {
        notLoggedPopup.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var loginButtons = document.querySelectorAll(".navToSignUp");

    loginButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            window.location.href = "signup.html";
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var loginButtons = document.querySelectorAll(".navToLogin");

    loginButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            window.location.href = "authentication.html";
        });
    });
});



let mlchck = false;

document.addEventListener("DOMContentLoaded", function () {
    var emailInput = document.getElementById("email");
    var emailExists = document.getElementById("emailExists");

    emailInput.addEventListener("blur", function () {
        var email = this.value.trim();  // Trim whitespace from the email

        if (email !== "") {
            checkEmailExists(email);
        }
    });

    emailExists.style.display = "none";
    function checkEmailExists(email) {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", "check_email.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = xhr.responseText;

                    if (response === "exists") {
                        mlchck = true;
                        emailExists.style.display = "block";
                        // You can handle what happens next, like preventing form submission.
                    } else if (response === "not_exists") {
                        mlchck = false;
                        emailExists.style.display = "none";
                        // You can perform additional actions here if needed
                    } else {
                        // Handle other responses or errors
                        console.error("Error: " + response);
                    }
                } else {
                    // Handle HTTP errors
                    console.error("HTTP error: " + xhr.status);
                }
            }
        };

        // Encode the data
        var data = "email=" + encodeURIComponent(email);

        // Handle network errors
        xhr.onerror = function () {
            console.error("Network error");
        };

        // Send the request
        xhr.send(data);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("password");

    var capsWarning = document.getElementById("capsWarning");
    capsWarning.style.display = "none";

    input.addEventListener("keyup", function (event) {

        if (event.getModifierState("CapsLock")) {
            capsWarning.style.display = "block";
        } else {
            capsWarning.style.display = "none";
        }
    });
});

let pswstr = false;
let pswchr = false;
let chckbx = false;

function checkPasswordStrength() {
    var password = document.getElementById('password').value;
    var strengthText = document.getElementById('strengthText');
    var minCharacters = document.getElementById('minCharacters')

    // Initialize points and criteria
    var points = 0;
    var minLength = 8;
    var minUppercase = 1;
    var minNumbers = 1;
    var minSpecialChars = 1;

    // Check password length
    if (password.length >= minLength) {
        points += 20;
        minCharacters.style.display = "none";
        pswstr = true;
    } else {
        minCharacters.style.display = "block";
        pswstr = false;
    }

    // Check for uppercase letters
    var uppercaseRegex = /[A-Z]/;
    if (password.match(uppercaseRegex) && password.match(uppercaseRegex).length >= minUppercase) {
        points += 2;
    }

    // Check for numbers
    var numbersRegex = /\d/;
    if (password.match(numbersRegex) && password.match(numbersRegex).length >= minNumbers) {
        points += 2;
    }

    // Check for special characters
    var specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.match(specialCharsRegex) && password.match(specialCharsRegex).length >= minSpecialChars) {
        points += 2;
    }

    // Determine strength based on points
    if (points >= 26) {
        strengthText.textContent = 'Ισχυρός';
        strengthText.className = 'strong';
    } else if (points >= 22) {
        strengthText.textContent = 'Μέτριος';
        strengthText.className = 'medium';
    } else {
        strengthText.textContent = 'Αδύναμος';
        strengthText.className = 'weak';
    }
}

function checkPasswordMatch() {
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('passwordCheck');
    var passwordMatchMessage = document.getElementById('noMatch');
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    if (password === confirmPassword) {
        passwordMatchMessage.textContent = '';
        pswchr = true;
    } else {
        passwordMatchMessage.textContent = 'Οι κωδικοί δεν ταιριάζουν';
        pswchr = false;
    }
}

function checkboxCheck() {
    var checkState = document.getElementById('gtpr');

    if (checkState.checked) {
        chckbx = true;
    } else {
        chckbx = false;
    }
    console.log(pswstr, pswchr, chckbx, mlchck);
}

function displayButton() {
    var continueButton = document.getElementById('signupContinue');
    continueButton.style.display = "none";
    if(pswstr === true && pswchr === true && chckbx === true && mlchck === false) {
        continueButton.style.display = 'block';
    } else {
        continueButton.style.display = 'none';
    }
}

var grsrnm = true;
var pit = true;

function checkSurname() {
    var surname = document.getElementById('surname').value;
    var greekRegex = /[\u0370-\u03FF]+$/;
    var greekCheck = document.getElementById('greekCheck');

    greekCheck.style.display = "none";
    if (greekRegex.test(surname)) {
        grsrnm = false;
        greekCheck.style.display = "none";
    } else {
        grsrnm = true;
        greekCheck.style.display = "block";
    }

    console.log("grsrnm:", grsrnm);
}

function checkTerm() {
    var termCheck = document.getElementById('termCheck');
    var termInput = document.getElementById('term');
    var term = parseInt(termInput.value);

    termCheck.style.display = "none";
    if (!isNaN(term) && Number.isInteger(term) && term > 0) {
        termCheck.style.display = "none";
        pit = false;
    } else {
        termCheck.style.display = "block";
        pit = true;
    }
}

function displayButton2() {
    var continueButton = document.getElementById('signupContinue2');
    continueButton.style.display = "none";
    if(grsrnm === false && pit === false) {
        continueButton.style.display = 'block';
    } else {
        continueButton.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var table = document.getElementById("tableId2");
    var subjectCountElement = document.getElementById("subjectCount2");
    var subjectCount2 = 0;

    table.addEventListener("click", function (e) {
        var row = e.target.parentNode;

        if (row.tagName === "TR") {
            var isPicked = row.classList.contains("picked");

            var inputElement = row.querySelector(".gradeInput");
            if (!isPicked) {
                row.classList.add("picked");
                subjectCount2++;

                // Show the input element in the picked row
                if (inputElement) {
                    inputElement.style.display = "block";
                }
            } else {
                row.classList.remove("picked");
                subjectCount2--;

                // Hide the input element in the unpicked row
                if (inputElement) {
                    inputElement.style.display = "none";
                }
            }
            subjectCountElement.textContent = "Σύνολο περατωμένων μαθημάτων: " + subjectCount2;
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    var table = document.getElementById("tableId2");
    var insertButton = document.getElementById("checkList");

    insertButton.addEventListener("click", function () {
        insertDataIntoDatabase(3); // Assuming you want to insert data from column 3
    });

    function insertDataIntoDatabase(columnIndex) {
        var rows = table.rows;
        var data = [];
        var invalidGrade = false; // Flag to track if any grade is invalid

        function extractNumericPart(str) {
            var matches = str.match(/(\d+)/g);
            return matches ? matches.join('') : '';
        }

        for (var i = 0; i < rows.length; i++) {
            var cell0 = rows[i].cells[0];
            var cell3 = rows[i].cells[columnIndex];
            var inputElement = cell3.querySelector('input');

            if (inputElement) {
                var inputValue = inputElement.value.trim();

                // Check if the input is not empty and is a valid number
                if (inputValue !== '' && !isNaN(inputValue)) {
                    var value = parseFloat(inputValue);

                    if (value < 5 || value > 10) {
                        // Set the flag to true if any grade is invalid
                        invalidGrade = true;
                        break; // Exit the loop early since there's no need to check further
                    }

                    data.push({ code: extractNumericPart(cell0.textContent), value: value });
                } else {
                    // Log NaN values but don't set the flag
                    console.log("NaN value encountered for row", i + 1);
                }
            }
        }

        if (invalidGrade) {
            alert("Επίλεξε μόνο τα μαθήματα που έχεις περάσει");
            return; // Exit the function without proceeding to data insertion
        }


        // Continue only if all grades are valid
        // Add session_token to the data
        data.push({ session_token: "<?php echo $sessionToken; ?>" });

        console.log("Session Token:", "<?php echo $sessionToken; ?>"); // Add this line for debugging
        console.log("Data to be inserted:", data);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "insert_grades.php", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Data inserted successfully!");
                window.location.href = 'homepage.html';
            } else {
                console.error(`Failed to insert data: ${xhr.statusText}`);
            }
        };

        xhr.send(JSON.stringify(data));
    }
});



document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("studentInfoBox");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Create FormData object from the form
        var formData = new FormData(form);

        // Send an AJAX request to the PHP script
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "insert_creds.php", true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                window.location.href = 'signup_3.html';
                // You can redirect or perform other actions after successful insertion
            } else {
                console.error("Failed to insert data:", xhr.statusText);
            }
        };

        xhr.send(formData);
    });
});

// charts.js

// Load the Google Charts library
google.charts.load('current', {'packages':['corechart']});

// Set callback function when the library is loaded
google.charts.setOnLoadCallback(drawVisualization);

// Function to draw the visualization
function drawVisualization() {
    // Some raw data (not necessarily accurate)
    var data = google.visualization.arrayToDataTable([
        ['Εξάμηνο', 'Μαθήματα'],
        ['1o', 4],
        ['2o', 5],
        ['3o', 3],
        ['4o', 8],
        ['5o', 4],
        ['1o', 4],
        ['2o', 5],
        ['3o', 3],
        ['4o', 8],
        ['5o', 4]
    ]);

    var options = {
        title : 'Monthly Coffee Production by Country',
        vAxis: {title: 'Cups'},
        hAxis: {title: 'Month'},
        seriesType: 'bars',
        series: {1: {type: 'line'}},
        backgroundColor: '#2B2B2B'
    };

    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}