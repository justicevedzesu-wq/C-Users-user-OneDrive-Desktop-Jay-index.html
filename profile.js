// ==========================================
// GET CURRENTLY LOGGED-IN STUDENT
// ==========================================

let currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// ==========================================
// CHECK IF USER IS LOGGED IN
// ==========================================

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "home.html";

}


// ==========================================
// LOAD PROFILE INFORMATION
// ==========================================

function loadProfile() {

    document.getElementById("fullName").value =
        currentUser.fullName || "";

    document.getElementById("username").value =
        currentUser.username || "";

    document.getElementById("email").value =
        currentUser.email || "";

    document.getElementById("phone").value =
        currentUser.phone || "";

    document.getElementById("department").value =
        currentUser.department || "";

    document.getElementById("level").value =
        currentUser.level || "";

    document.getElementById("bio").value =
        currentUser.bio || "";


    // Header

    document.getElementById("profileName").textContent =
        currentUser.fullName ||
        currentUser.username;

    document.getElementById("profileUsername").textContent =
        "@" + currentUser.username;

}


// ==========================================
// ENABLE EDITING
// ==========================================

function enableEditing() {

    document
        .querySelectorAll("#profileForm input, #profileForm select, #profileForm textarea")
        .forEach(function(element) {

            element.disabled = false;

        });


    document.getElementById("saveArea")
        .style.display = "flex";


    document.getElementById("editButton")
        .style.display = "none";

}


// ==========================================
// CANCEL EDITING
// ==========================================

function cancelEditing() {

    loadProfile();


    document
        .querySelectorAll("#profileForm input, #profileForm select, #profileForm textarea")
        .forEach(function(element) {

            element.disabled = true;

        });


    document.getElementById("saveArea")
        .style.display = "none";


    document.getElementById("editButton")
        .style.display = "block";

}


// ==========================================
// SAVE PROFILE
// ==========================================

document
    .getElementById("profileForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        // Get updated information

        currentUser.fullName =
            document.getElementById("fullName").value.trim();

        currentUser.username =
            document.getElementById("username").value.trim();

        currentUser.email =
            document.getElementById("email").value.trim();

        currentUser.phone =
            document.getElementById("phone").value.trim();

        currentUser.department =
            document.getElementById("department").value.trim();

        currentUser.level =
            document.getElementById("level").value;

        currentUser.bio =
            document.getElementById("bio").value.trim();


        // ======================================
        // UPDATE USER IN USERS ARRAY
        // ======================================

        let users =
            JSON.parse(localStorage.getItem("users")) || [];


        const userIndex =
            users.findIndex(function(user) {

                return user.username === currentUser.username;

            });


        if (userIndex !== -1) {

            users[userIndex] = currentUser;

        }


        // ======================================
        // SAVE EVERYTHING
        // ======================================

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );


        // ======================================
        // UPDATE DISPLAY
        // ======================================

        document.getElementById("profileName").textContent =
            currentUser.fullName ||
            currentUser.username;

        document.getElementById("profileUsername").textContent =
            "@" + currentUser.username;


        alert("Profile updated successfully! ✅");


        // Disable editing again

        document
            .querySelectorAll("#profileForm input, #profileForm select, #profileForm textarea")
            .forEach(function(element) {

                element.disabled = true;

            });


        document.getElementById("saveArea")
            .style.display = "none";


        document.getElementById("editButton")
            .style.display = "block";

    });


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem("currentUser");

    alert("You have been logged out.");

    window.location.href = "home.html";

}


// ==========================================
// LOAD PROFILE WHEN PAGE OPENS
// ==========================================

loadProfile();
// ================================
// PROFILE PHOTO
// ================================

const photoInput = document.getElementById("photoInput");
const profilePhoto = document.getElementById("profilePhoto");


// Load saved profile photo
function loadProfilePhoto() {

    const savedPhoto = localStorage.getItem("profilePhoto");

    if (savedPhoto) {
        profilePhoto.src = savedPhoto;
    }
}


// Select new photo
photoInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }


    // Make sure the selected file is an image
    if (!file.type.startsWith("image/")) {

        alert("Please select an image file.");

        return;
    }


    // Limit file size to 2 MB
    if (file.size > 2 * 1024 * 1024) {

        alert("Please choose an image smaller than 2 MB.");

        return;
    }


    const reader = new FileReader();


    reader.onload = function (event) {

        const imageData = event.target.result;

        // Display photo
        profilePhoto.src = imageData;

        // Save photo
        localStorage.setItem("profilePhoto", imageData);

        alert("Profile photo updated successfully! 📸");

    };


    reader.readAsDataURL(file);

});


// Load photo when profile opens
loadProfilePhoto();