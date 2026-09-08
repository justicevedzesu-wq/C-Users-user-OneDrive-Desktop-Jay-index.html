function login() {

    // Get username and password values
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;


    if (username === 'Jay' && password === '101101#Jay') {

        alert('Login successful!');

        // Redirect to dashboard page
        window.location.href = 'dashboard.html';

    } else {

        alert('Invalid username or password. Please try again.');

    }

}