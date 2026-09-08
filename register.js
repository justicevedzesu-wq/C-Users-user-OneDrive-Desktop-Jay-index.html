document
    .getElementById("registerForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("message");


        // Check if passwords match
        if (password !== confirmPassword) {

            message.innerHTML =
                "❌ Passwords do not match.";

            message.style.color = "red";

            return;
        }


        // Get previously registered users
        // If there are none, create an empty array

        let users =
            JSON.parse(localStorage.getItem("users")) || [];


        // Check if username already exists

        const usernameExists =
            users.some(user =>
                user.username.toLowerCase() ===
                username.toLowerCase()
            );


        if (usernameExists) {

            message.innerHTML =
                "❌ Username already exists.";

            message.style.color = "red";

            return;
        }


        // Create new account

        const newUser = {

            username: username,
            email: email,
            password: password

        };


        // Add new account to existing accounts

        users.push(newUser);


        // SAVE PERMANENTLY IN THIS BROWSER

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        message.innerHTML =
            "✅ Account created successfully!";

        message.style.color = "green";


        // Clear registration form

        document
            .getElementById("registerForm")
            .reset();


        // Go to login after 1.5 seconds

        setTimeout(function() {

            window.location.href = "home.html";

        }, 1500);

    });