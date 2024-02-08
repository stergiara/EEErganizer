document.addEventListener("DOMContentLoaded", function () {

    function updateLoginStatus() {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "check_login_status.php", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);

                if (!response.isLoggedIn) {
                    // User is not logged in, redirect to login page
                    window.location.href = "authentication.html";
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
