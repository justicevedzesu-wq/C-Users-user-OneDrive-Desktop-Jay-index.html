
// ==========================================
// STUDENT LOGIN CHECK
// ==========================================

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    window.location.href = "home.html";

}


// ==========================================
// LESSON LIST
// ==========================================
//
// Add new lessons here whenever you create one.
// The "id" MUST match the completed value
// used in lesson-complete.html
//
// Example:
// lesson-complete.html?completed=computer-ethics
//

const lessons = [

    {
        id: "cs-introduction",
        title: "Introduction to Computer Science",
        description:
            "Learn the foundations of computer science and understand how computers and technology work.",
        url: "cs-introduction.html"
    },

    {
        id: "computer-systems",
        title: "Computer Systems",
        description:
            "Learn about computer hardware, software, memory, processors and other computer components.",
        url: "computer-systems.html"
    },

    {
        id: "algorithms",
        title: "Algorithms & Problem Solving",
        description:
            "Learn how to design step-by-step solutions to problems using algorithms.",
        url: "algorithms.html"
    },

    {
        id: "programming",
        title: "Programming with C++",
        description:
            "Learn programming concepts, variables, loops, functions and other C++ fundamentals.",
        url: "programming.html"
    },

    {
        id: "data-structures",
        title: "Data Structures",
        description:
            "Learn how data can be organized, stored and managed efficiently.",
        url: "data-structures.html"
    },

    {
        id: "computer-ethics",
        title: "Computer Ethics",
        description:
            "Learn about privacy, security, intellectual property and responsible use of technology.",
        url: "computer-ethics.html"
    }

];


// ==========================================
// GET COMPLETED LESSONS
// ==========================================

function getCompletedLessons() {

    return JSON.parse(
        localStorage.getItem("completedLessons")
    ) || [];

}


// ==========================================
// FIND NEXT UNFINISHED LESSON
// ==========================================

function getNextLesson() {

    const completedLessons =
        getCompletedLessons();

    return lessons.find(function (lesson) {

        return !completedLessons.includes(
            lesson.id
        );

    });

}


// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateLessonProgress() {

    const completedLessons =
        getCompletedLessons();

    const completedCount =
        completedLessons.length;

    const totalLessons =
        lessons.length;


    // Calculate percentage

    const progress =
        totalLessons === 0
            ? 0
            : Math.round(
                (completedCount / totalLessons) * 100
            );


    // Completed lessons number

    const completedElement =
        document.getElementById(
            "completedLessons"
        );

    if (completedElement) {

        completedElement.textContent =
            completedCount;

    }


    // Progress percentage

    const progressElement =
        document.getElementById(
            "lessonProgress"
        );

    if (progressElement) {

        progressElement.textContent =
            progress + "%";

    }

}


// ==========================================
// SHOW NEXT RECOMMENDED LESSON
// ==========================================

function showNextLesson() {

    const nextLesson =
        getNextLesson();


    const title =
        document.getElementById(
            "recommendedTitle"
        );

    const description =
        document.getElementById(
            "recommendedDescription"
        );

    const button =
        document.getElementById(
            "recommendedButton"
        );


    // If all lessons are completed

    if (!nextLesson) {

        if (title) {

            title.textContent =
                "🎉 All Lessons Completed!";

        }

        if (description) {

            description.textContent =
                "Excellent work! You have completed all the available lessons.";

        }

        if (button) {

            button.style.display =
                "none";

        }

        return;

    }


    // Show next lesson

    if (title) {

        title.textContent =
            nextLesson.title;

    }


    if (description) {

        description.textContent =
            nextLesson.description;

    }


    if (button) {

        button.href =
            nextLesson.url;

        button.style.display =
            "inline-block";

        button.innerHTML =
            'Start Lesson <i class="fa-solid fa-arrow-right"></i>';

    }

}


// ==========================================
// COURSE BUTTONS
// ==========================================

function enter() {

    window.location.href =
        "comp.sci.html";

}


function enter1() {

    window.location.href =
        "math.html";

}


function enter2() {

    window.location.href =
        "programming.html";

}


// ==========================================
// START DASHBOARD
// ==========================================

updateLessonProgress();

showNextLesson();
