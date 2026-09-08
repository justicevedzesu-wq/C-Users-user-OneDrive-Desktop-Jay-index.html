```javascript
// =========================
// LOGIN SYSTEM
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        // Get username
        const username = document
            .getElementById("username")
            .value
            .trim();

        // Get password
        const password = document
            .getElementById("password")
            .value;

        // Get registered users
        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        // Find matching user
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

            // Save logged-in user
            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            alert("Login successful! 🎉");

            // Open dashboard
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

