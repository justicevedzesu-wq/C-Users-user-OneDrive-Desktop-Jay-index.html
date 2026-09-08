<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

```
<title>My Learning Platform</title>

<!-- CSS -->
<link rel="stylesheet" href="home.css">

<!-- JavaScript -->
<script src="h.js" defer></script>
```

</head>

<body>

```
<!-- HEADER -->
<header class="site-header">
    <h1>Welcome to My Learning Platform!</h1>
</header>


<!-- NAVIGATION -->
<nav class="main-nav">
    <div class="logo">
        MyWebsite
    </div>

    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>


<!-- MAIN CONTENT -->
<main>

    <!-- LOGIN SECTION -->
    <section class="login-container">

        <div class="login-box">

            <h2>Login</h2>

            <form id="loginForm">

                <div class="input-box">
                    <label for="username">Username</label>

                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        autocomplete="username"
                        required
                    >
                </div>


                <div class="input-box">
                    <label for="password">Password</label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        autocomplete="current-password"
                        required
                    >
                </div>


                <button type="submit">
                    Login
                </button>


                <p>
                    Don't have an account?
                    <a href="register.html">Register</a>
                </p>

            </form>

        </div>

    </section>


    <!-- LATEST UPDATES -->
    <section class="info-container">

        <div class="info-box">

            <div class="label-box">
                <h2>Latest Updates</h2>
            </div>

            <p>
                Check out the latest updates and news
                related to our platform.
            </p>

            <nav class="info-nav" aria-label="Latest updates">
                <ul>
                    <li>
                        <a href="#">Update 1</a>
                    </li>

                    <li>
                        <a href="#">Update 2</a>
                    </li>

                    <li>
                        <a href="#">Update 3</a>
                    </li>
                </ul>
            </nav>

        </div>

    </section>

</main>


<!-- FOOTER -->
<footer>
    <p>&copy; 2026 My Learning Platform. All rights reserved.</p>
</footer>
```

</body>

</html>
