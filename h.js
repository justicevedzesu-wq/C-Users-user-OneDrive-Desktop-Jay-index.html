// =========================
// LOGIN SYSTEM
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        // Stop the form from refreshing the page
        event.preventDefault();

        // Get username and password
        const username = document
            .getElementById("username")
            .value
            .trim();

        const password = document
            .getElementById("password")
            .value;

        // Get registered users from localStorage
        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        // Find a matching account
        const user = users.find(function (account) {

            return (
                account.username === username &&
                account.password === password
            );

        });

        // =========================
        // SUCCESSFUL LOGIN
        // =========================

        if (user) {

            // Save currently logged-in user
            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            alert("Login successful! 🎉");

            // Go to dashboard
            window.location.href = "dashboard.html";

        }

        // =========================
        // FAILED LOGIN
        // =========================

        else {

            alert("Incorrect username or password ❌");

        }

    });

}
