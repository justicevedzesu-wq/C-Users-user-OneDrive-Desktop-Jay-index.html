
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


    // ======================================
    // PROFILE HEADER
    // ======================================

    document.getElementById("profileName").textContent =
        currentUser.fullName ||
        currentUser.username ||
        "Student";

    document.getElementById("profileUsername").textContent =
        "@" + (currentUser.username || "username");


    // Load profile picture/avatar
    loadProfilePhoto();

}



// ==========================================
// ENABLE EDITING
// ==========================================

function enableEditing() {

    document
        .querySelectorAll(
            "#profileForm input, #profileForm select, #profileForm textarea"
        )
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
        .querySelectorAll(
            "#profileForm input, #profileForm select, #profileForm textarea"
        )
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

        const oldUsername =
            currentUser.username;


        currentUser.fullName =
            document.getElementById("fullName")
                .value.trim();

        currentUser.username =
            document.getElementById("username")
                .value.trim();

        currentUser.email =
            document.getElementById("email")
                .value.trim();

        currentUser.phone =
            document.getElementById("phone")
                .value.trim();

        currentUser.department =
            document.getElementById("department")
                .value.trim();

        currentUser.level =
            document.getElementById("level")
                .value;

        currentUser.bio =
            document.getElementById("bio")
                .value.trim();


        // ======================================
        // UPDATE USER IN USERS ARRAY
        // ======================================

        let users =
            JSON.parse(localStorage.getItem("users")) || [];


        const userIndex =
            users.findIndex(function(user) {

                return user.username === oldUsername;

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
            currentUser.username ||
            "Student";

        document.getElementById("profileUsername").textContent =
            "@" + (currentUser.username || "username");


        alert("Profile updated successfully! ✅");


        // Disable editing again

        document
            .querySelectorAll(
                "#profileForm input, #profileForm select, #profileForm textarea"
            )
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
// PROFILE PHOTO / AVATAR SYSTEM
// ==========================================

const photoInput =
    document.getElementById("photoInput");

const profilePhoto =
    document.getElementById("profilePhoto");

const photoPlaceholder =
    document.getElementById("photoPlaceholder");

const profileHeaderPhoto =
    document.getElementById("profileHeaderPhoto");

const defaultProfileIcon =
    document.getElementById("defaultProfileIcon");


// ==========================================
// AVATAR LIST
// ==========================================

const avatars = {

    male1:
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Felix",

    male2:
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Jack",

    male3:
        "https://api.dicebear.com/9.x/adventurer/svg?seed=James",

    male4:
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Michael",


    female1:
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Amelia",

    female2:
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia",

    female3:
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Emma",

    female4:
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Olivia"

};



// ==========================================
// CREATE USER-SPECIFIC STORAGE KEY
// ==========================================

function getProfileImageKey() {

    const username =
        currentUser.username || "student";

    return "profileImage_" + username;

}



// ==========================================
// DISPLAY PROFILE IMAGE
// ==========================================

function displayProfileImage(image) {

    if (!image) {

        removeDisplayedProfileImage();

        return;

    }


    // ======================================
    // PROFILE CARD IMAGE
    // ======================================

    if (profilePhoto) {

        profilePhoto.src = image;

        profilePhoto.style.display = "block";

    }


    if (photoPlaceholder) {

        photoPlaceholder.style.display = "none";

    }


    // ======================================
    // PROFILE HEADER IMAGE
    // ======================================

    if (profileHeaderPhoto) {

        profileHeaderPhoto.src = image;

        profileHeaderPhoto.style.display = "block";

    }


    if (defaultProfileIcon) {

        defaultProfileIcon.style.display = "none";

    }


    // ======================================
    // REMOVE OLD SELECTED STATE
    // ======================================

    document
        .querySelectorAll(".avatar-option")
        .forEach(function(button) {

            button.classList.remove("selected");

        });


    // Highlight selected avatar

    document
        .querySelectorAll(".avatar-option")
        .forEach(function(button) {

            const imageElement =
                button.querySelector("img");

            if (
                imageElement &&
                imageElement.src === image
            ) {

                button.classList.add("selected");

            }

        });

}



// ==========================================
// RETURN TO DEFAULT PROFILE ICON
// ==========================================

function removeDisplayedProfileImage() {

    if (profilePhoto) {

        profilePhoto.src = "";

        profilePhoto.style.display = "none";

    }


    if (photoPlaceholder) {

        photoPlaceholder.style.display = "flex";

    }


    if (profileHeaderPhoto) {

        profileHeaderPhoto.src = "";

        profileHeaderPhoto.style.display = "none";

    }


    if (defaultProfileIcon) {

        defaultProfileIcon.style.display = "block";

    }


    document
        .querySelectorAll(".avatar-option")
        .forEach(function(button) {

            button.classList.remove("selected");

        });

}



// ==========================================
// LOAD SAVED PROFILE PHOTO / AVATAR
// ==========================================

function loadProfilePhoto() {

    const savedImage =
        localStorage.getItem(
            getProfileImageKey()
        );


    if (savedImage) {

        displayProfileImage(savedImage);

    } else {

        removeDisplayedProfileImage();

    }

}



// ==========================================
// UPLOAD NEW PROFILE PHOTO
// ==========================================

if (photoInput) {

    photoInput.addEventListener(
        "change",
        function() {

            const file =
                this.files[0];


            if (!file) {

                return;

            }


            // Check image type

            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select an image file."
                );

                this.value = "";

                return;

            }


            // Limit file size to 2 MB

            if (
                file.size >
                2 * 1024 * 1024
            ) {

                alert(
                    "Please choose an image smaller than 2 MB."
                );

                this.value = "";

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function(event) {

                    const imageData =
                        event.target.result;


                    // Save image for this user

                    localStorage.setItem(
                        getProfileImageKey(),
                        imageData
                    );


                    // Display image

                    displayProfileImage(
                        imageData
                    );


                    alert(
                        "Profile photo updated successfully! 📸"
                    );

                };


            reader.readAsDataURL(file);


            // Allow selecting the same file again

            this.value = "";

        }
    );

}



// ==========================================
// SELECT AVATAR
// ==========================================

function selectAvatar(avatarName) {

    const avatar =
        avatars[avatarName];


    if (!avatar) {

        return;

    }


    // Save selected avatar

    localStorage.setItem(
        getProfileImageKey(),
        avatar
    );


    // Display avatar

    displayProfileImage(
        avatar
    );


    alert(
        "Avatar selected successfully! 👤"
    );

}



// ==========================================
// REMOVE PROFILE PHOTO / AVATAR
// ==========================================

function removeProfilePhoto() {

    const storageKey =
        getProfileImageKey();


    // Remove saved image

    localStorage.removeItem(
        storageKey
    );


    // Return to default icon

    removeDisplayedProfileImage();


    // Clear file input

    if (photoInput) {

        photoInput.value = "";

    }


    alert(
        "Profile photo removed successfully! 🗑️"
    );

}



// ==========================================
// LOAD PROFILE WHEN PAGE OPENS
// ==========================================

loadProfile();

