function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;


    // Get saved accounts

    const users =
        JSON.parse(localStorage.getItem("users")) || [];


    // Look for matching account

    const user =
        users.find(account =>

            account.username === username &&
            account.password === password

        );


    if (user) {

        // Remember the logged-in student

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        alert("Login successful! 🎉");


        // Go to dashboard

        window.location.href =
            "dashboard.html";

    }

    else {

        alert(
            "Incorrect username or password ❌"
        );

    }

}function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;


    // Get saved accounts

    const users =
        JSON.parse(localStorage.getItem("users")) || [];


    // Look for matching account

    const user =
        users.find(account =>

            account.username === username &&
            account.password === password

        );


    if (user) {

        // Remember the logged-in student

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        alert("Login successful! 🎉");


        // Go to dashboard

        window.location.href =
            "dashboard.html";

    }

    else {

        alert(
            "Incorrect username or password ❌"
        );

    }

}
