document.addEventListener("DOMContentLoaded", function () {
    var loginLink = document.getElementById("loginLink");
    var signupLink = document.getElementById("signupLink");

    function updateLoginStatus() {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "check_login_status.php", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);

                if (response.isLoggedIn) {
                    loginLink.textContent = "Account";
                    signupLink.textContent = "Log Out";
                    loginLink.href = "account.html";
                    signupLink.href = "#";
                    document.getElementById('notLoggedHomepage').style.display = 'none';
                } else {
                    loginLink.textContent = "Login";
                    signupLink.textContent = "Sign Up";
                    loginLink.href = "authentication.html";
                    signupLink.href = "signup.html";
                    document.getElementById('notLoggedHomepage').style.display = 'block';
                }
            }
        };

        xhr.onerror = function () {
            console.error("Network error");
        };

        xhr.send();
    }

    updateLoginStatus();

});

function logoutClicked() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "check_login_status.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            if (response.isLoggedIn) {
                var confirmLogout = confirm("Are you sure you want to log out?");

                if (confirmLogout) {
                    var logoutXhr = new XMLHttpRequest();

                    logoutXhr.open("GET", "logout.php", true);

                    logoutXhr.onreadystatechange = function () {
                        if (logoutXhr.readyState === 4 && logoutXhr.status === 200) {
                            loginLink.textContent = "Login";
                            signupLink.textContent = "Sign Up";
                            loginLink.href = "authentication.html";
                            signupLink.href = "signup.html";

                        }
                    };

                    logoutXhr.send();
                }
            }
        }
    };

    xhr.send();
}


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
        var email = this.value.trim();

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
                    } else if (response === "not_exists") {
                        mlchck = false;
                        emailExists.style.display = "none";
                    } else {
                        console.error("Error: " + response);
                    }
                } else {
                    console.error("HTTP error: " + xhr.status);
                }
            }
        };

        var data = "email=" + encodeURIComponent(email);

        xhr.onerror = function () {
            console.error("Network error");
        };

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

    var points = 0;
    var minLength = 8;
    var minUppercase = 1;
    var minNumbers = 1;
    var minSpecialChars = 1;

    if (password.length >= minLength) {
        points += 20;
        minCharacters.style.display = "none";
        pswstr = true;
    } else {
        minCharacters.style.display = "block";
        pswstr = false;
    }

    var uppercaseRegex = /[A-Z]/;
    if (password.match(uppercaseRegex) && password.match(uppercaseRegex).length >= minUppercase) {
        points += 2;
    }

    var numbersRegex = /\d/;
    if (password.match(numbersRegex) && password.match(numbersRegex).length >= minNumbers) {
        points += 2;
    }

    var specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.match(specialCharsRegex) && password.match(specialCharsRegex).length >= minSpecialChars) {
        points += 2;
    }

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

                if (inputElement) {
                    inputElement.style.display = "block";
                }
            } else {
                row.classList.remove("picked");
                subjectCount2--;

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
        insertDataIntoDatabase(3);
    });

    function insertDataIntoDatabase(columnIndex) {
        var rows = table.rows;
        var data = [];
        var invalidGrade = false;

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

                if (inputValue !== '' && !isNaN(inputValue)) {
                    var value = parseFloat(inputValue);

                    if (value < 5 || value > 10) {
                        invalidGrade = true;
                        break;
                    }

                    data.push({ code: extractNumericPart(cell0.textContent), value: value });
                } else {
                    console.log("NaN value encountered for row", i + 1);
                }
            }
        }

        if (invalidGrade) {
            alert("Επίλεξε μόνο τα μαθήματα που έχεις περάσει.");
            return;
        }


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
        event.preventDefault();

        // Create FormData object from the form
        var formData = new FormData(form);

        // Send an AJAX request to the PHP script
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "insert_creds.php", true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                window.location.href = 'signup_3.html';
            } else {
                console.error("Failed to insert data:", xhr.statusText);
            }
        };

        xhr.send(formData);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var table = document.getElementById("tableId");
    console.log("test");

    // Function to highlight table cells containing integers
    function highlightTableCells(integerColumns) {
        var rows = table.rows;

        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].cells;

            for (var j = 0; j < cells.length; j++) {
                var columnName = cells[j].getAttribute('data-column');
                if (integerColumns[columnName]) {
                    var cellValue = cells[j].textContent.trim();
                    if (!isNaN(cellValue)) {
                        var value = parseFloat(cellValue);
                        if (value >= 5 && value <= 10) {
                            cells[j].classList.add("highlighted-cell");
                        }
                    }
                }
            }
        }
    }

    // Function to fetch class data from the database
    function fetchDataFromDatabase() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "fetch_data.php", true); // Adjust the URL to your PHP script
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onload = function () {
            if (xhr.status === 200) {
                var integerColumns = JSON.parse(xhr.responseText);
                highlightTableCells(integerColumns);
            } else {
                console.error(`Failed to fetch data: ${xhr.statusText}`);
            }
        };

        xhr.send(JSON.stringify({ sessionToken: session_token }));
    }

    // Call the function to fetch data from the database and highlight cells
    fetchDataFromDatabase();
});

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Make an AJAX request to fetch i values
    fetch('graph_data.php')
        .then(response => response.json())
        .then(data => {
            // Extract i values from the fetched data
            var i1 = data.i1;
            var i2 = data.i2;
            var i3 = data.i3;
            var i4 = data.i4;
            var i5 = data.i5;
            var i6 = data.i6;
            var i7 = data.i7;
            var i8 = data.i8;
            var i9 = data.i9;

            // Create data table for the chart
            var chartData = new google.visualization.DataTable();
            chartData.addColumn('string', 'Category');
            chartData.addColumn('number', 'Μαθήματα');

            // Add rows with i values
            chartData.addRows([
                ['1ο', i1],
                ['2ο', i2],
                ['3ο', i3],
                ['4ο', i4],
                ['5ο', i5],
                ['6ο', i6],
                ['7ο', i7],
                ['8ο', i8],
                ['9ο', i9]
            ]);

            // Chart options
            var options = {
                title: 'Περασμένα μαθήματα ανά εξάμηνο',
                seriesType: 'bars',
                vAxis: {
                    viewWindow: {
                        min: 0,
                        max: 6
                    }
                },
                backgroundColor: '#2B2B2B',  // Background color
                colors: ['#406F70'],       // Bar color (you can specify an array for multiple series)
                legend: {textStyle: {color: '#FFFFFF'}},  // Legend text color
                titleTextStyle: {color: '#FFFFFF'},        // Title text color
                hAxis: {textStyle: {color: '#FFFFFF'}},    // Horizontal axis text color
                vAxis: {textStyle: {color: '#FFFFFF'}}     // Vertical axis text color
            };

            // Create and draw the chart
            var chart = new google.visualization.ComboChart(document.getElementById('chartContainer'));
            chart.draw(chartData, options);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// jQuery document ready function
$(document).ready(function () {
    // Fetch login status using AJAX
    $.ajax({
        url: 'check_login_status.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            // Check if the user is logged in
            if (response.isLoggedIn) {
                // If logged in, hide the div
                $('#notLoggedHomepage').hide();
            } else {
                // If not logged in, do nothing or show the div (optional)
                // $('#myDiv').show();
            }
        },
        error: function () {
            console.error('Error fetching login status.');
        }
    });
});

