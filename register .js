```javascript
function register() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    // Make sure fields are not empty
    if (username === "" || password === "") {
        alert("Please enter a username and password.");
        return;
    }

    // Get existing users
    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    const userExists = users.some(function (account) {
        return account.username === username;
    });

    if (userExists) {
        alert("Username already exists!");
        return;
    }

    // Create the new account
    const newUser = {
        username: username,
        password: password
    };

    // Add account to users
    users.push(newUser);

    // Save users
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully! 🎉");

    // Go to login page
    window.location.href = "index.html";
}
```
