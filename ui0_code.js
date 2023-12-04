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
            window.location.href = "authentication.html";
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