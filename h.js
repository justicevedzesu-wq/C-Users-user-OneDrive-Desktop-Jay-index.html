```javascript
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;


        // Get saved accounts
        const users =
            JSON.parse(localStorage.getItem("users")) || [];


        // Find matching account
        const user = users.find(function (account) {

            return (
                account.username === username &&
                account.password === password
            );

        });


        if (user) {

            // Remember the logged-in student
            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );


            alert("Login successful! 🎉");


            // Open dashboard
            window.location.href = "dashboard.html";

        }

        else {

            alert(
                "Incorrect username or password ❌"
            );

        }

    });

}
```
