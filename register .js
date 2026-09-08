```javascript
function register() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    // Get existing accounts
    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    const existingUser =
        users.find(account => account.username === username);

    if (existingUser) {
        alert("Username already exists!");
        return;
    }

    // Add new account
    users.push({
        username: username,
        password: password
    });

    // Save accounts
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "home.html";
}
```
