
/* ============================================
   LESSON COMPLETION PAGE
   ============================================ */


/* --------------------------------------------
   GET COMPLETED LESSON
-------------------------------------------- */

const params = new URLSearchParams(window.location.search);

const completedLesson = params.get("completed");


/* --------------------------------------------
   LESSON SEQUENCE
-------------------------------------------- */

const lessonSequence = {

    "cs-introduction": {
        title: "Computer Systems",
        description:
            "Learn about computer hardware, software, the CPU, memory and other system components.",
        url: "computer-systems.html"
    },

    "computer-systems": {
        title: "Algorithms & Problem Solving",
        description:
            "Learn how to design step-by-step solutions to problems.",
        url: "algorithms.html"
    },

    "algorithms": {
        title: "Programming with C++",
        description:
            "Start learning programming concepts and write your first C++ programs.",
        url: "programming.html"
    },

    "programming": {
        title: "Data Structures",
        description:
            "Learn how data can be organized and stored efficiently.",
        url: "data-structures.html"
    },

    "data-structures": {
        title: "Computer Ethics",
        description:
            "Learn about responsible and ethical use of computer technology.",
        url: "computer-ethics.html"
    },

    "computer-ethics": {
        title: "Introduction to Computer Science",
        description:
            "Begin again with the foundations of computer science and build your knowledge step by step.",
        url: "cs-introduction.html"
    }

};


/* --------------------------------------------
   SHOW NEXT LESSON
-------------------------------------------- */

function showNextLesson() {

    const nextLesson =
        lessonSequence[completedLesson];


    /*
       If the completed lesson is not found,
       use Introduction to Computer Science
       as the default.
    */

    const lesson =
        nextLesson || {
            title: "Introduction to Computer Science",

            description:
                "Start learning the foundations of computer science.",

            url: "cs-introduction.html"
        };


    /* Next lesson button */

    const nextLessonButton =
        document.getElementById("nextLessonButton");


    if (nextLessonButton) {

        nextLessonButton.href =
            lesson.url;

    }


    /* Button title */

    const nextLessonTitle =
        document.getElementById("nextLessonTitle");


    if (nextLessonTitle) {

        nextLessonTitle.textContent =
            "Take More Lessons";

    }


    /* Button description */

    const nextLessonDescription =
        document.getElementById(
            "nextLessonDescription"
        );


    if (nextLessonDescription) {

        nextLessonDescription.textContent =
            `Continue with ${lesson.title}.`;

    }


    /* Next lesson heading */

    const nextLessonHeading =
        document.getElementById(
            "nextLessonHeading"
        );


    if (nextLessonHeading) {

        nextLessonHeading.textContent =
            lesson.title;

    }


    /* Next lesson information */

    const nextLessonText =
        document.getElementById(
            "nextLessonText"
        );


    if (nextLessonText) {

        nextLessonText.textContent =
            lesson.description;

    }

}


/* Run next lesson function */

showNextLesson();



/* ============================================
   LESSON FEEDBACK
   ============================================ */

let selectedRating = 0;


/* --------------------------------------------
   SELECT STAR RATING
-------------------------------------------- */

function selectRating(rating) {

    selectedRating = rating;


    const buttons =
        document.querySelectorAll(
            ".rating button"
        );


    buttons.forEach(function (button, index) {

        if (index < rating) {

            button.classList.add("selected");

        } else {

            button.classList.remove("selected");

        }

    });

}



/* --------------------------------------------
   SUBMIT FEEDBACK
-------------------------------------------- */

function submitFeedback() {

    const feedbackInput =
        document.getElementById("feedback");

    const message =
        document.getElementById(
            "feedbackMessage"
        );


    const feedback =
        feedbackInput.value.trim();


    /* Check rating */

    if (selectedRating === 0) {

        message.textContent =
            "Please select a rating first ⭐";

        return;

    }


    /* ----------------------------------------
       GET EXISTING FEEDBACK
    ---------------------------------------- */

    const existingFeedback =
        JSON.parse(
            localStorage.getItem(
                "lessonFeedback"
            )
        ) || [];


    /* ----------------------------------------
       GET CURRENT USER
    ---------------------------------------- */

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        ) || null;


    /* ----------------------------------------
       CREATE FEEDBACK
    ---------------------------------------- */

    const newFeedback = {

        lesson:
            completedLesson ||
            "unknown",

        username:
            currentUser
                ? currentUser.username
                : "Anonymous",

        rating:
            selectedRating,

        feedback:
            feedback,

        date:
            new Date().toISOString()

    };


    /* Add new feedback */

    existingFeedback.push(
        newFeedback
    );


    /* Save feedback */

    localStorage.setItem(
        "lessonFeedback",
        JSON.stringify(
            existingFeedback
        )
    );


    /* ----------------------------------------
       SUCCESS MESSAGE
    ---------------------------------------- */

    message.textContent =
        "Thank you for your feedback! 🎉";


    /* Clear feedback box */

    feedbackInput.value = "";


    /* Reset rating */

    selectedRating = 0;


    const buttons =
        document.querySelectorAll(
            ".rating button"
        );


    buttons.forEach(function (button) {

        button.classList.remove(
            "selected"
        );

    });

}

