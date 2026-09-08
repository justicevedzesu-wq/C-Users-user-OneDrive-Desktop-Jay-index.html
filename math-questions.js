// ==========================================
// MATHEMATICS QUESTION BANK
// ==========================================

const questionBank = [

    {
        question: "Solve: 2x + 6 = 14",
        options: ["2", "4", "6", "8"],
        answer: "4"
    },

    {
        question: "What is the derivative of x³?",
        options: ["x²", "2x", "3x²", "3x"],
        answer: "3x²"
    },

    {
        question: "Find the area of a rectangle with length 8 cm and width 5 cm.",
        options: ["13 cm²", "26 cm²", "40 cm²", "45 cm²"],
        answer: "40 cm²"
    },

    {
        question: "What is the sum of the interior angles of a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        answer: "180°"
    },

    {
        question: "Find ∫x² dx.",
        options: ["x² + C", "2x + C", "x³/3 + C", "3x² + C"],
        answer: "x³/3 + C"
    },

    {
        question: "Solve: 5x = 25",
        options: ["3", "4", "5", "6"],
        answer: "5"
    },

    {
        question: "What is the value of √64?",
        options: ["6", "7", "8", "9"],
        answer: "8"
    },

    {
        question: "What is 15% of 200?",
        options: ["20", "25", "30", "35"],
        answer: "30"
    },

    {
        question: "If x = 4, what is x² + 3?",
        options: ["16", "19", "20", "21"],
        answer: "19"
    },

    {
        question: "What is the gradient of the line y = 3x + 5?",
        options: ["3", "5", "8", "2"],
        answer: "3"
    },

    {
        question: "Factorise: x² + 5x + 6",
        options: [
            "(x + 1)(x + 6)",
            "(x + 2)(x + 3)",
            "(x + 4)(x + 2)",
            "(x + 5)(x + 1)"
        ],
        answer: "(x + 2)(x + 3)"
    },

    {
        question: "What is sin(90°)?",
        options: ["0", "1", "-1", "1/2"],
        answer: "1"
    },

    {
        question: "What is cos(0°)?",
        options: ["0", "1", "-1", "1/2"],
        answer: "1"
    },

    {
        question: "What is the perimeter of a square with side 6 cm?",
        options: ["12 cm", "18 cm", "24 cm", "36 cm"],
        answer: "24 cm"
    },

    {
        question: "Solve: x - 7 = 10",
        options: ["3", "10", "17", "20"],
        answer: "17"
    },

    {
        question: "What is 7 × 8?",
        options: ["54", "56", "58", "64"],
        answer: "56"
    },

    {
        question: "What is the value of 3² + 4²?",
        options: ["12", "20", "25", "49"],
        answer: "25"
    },

    {
        question: "Differentiate 5x.",
        options: ["5", "x", "5x²", "0"],
        answer: "5"
    },

    {
        question: "What is the integral of 1 dx?",
        options: ["0", "1", "x + C", "x² + C"],
        answer: "x + C"
    },

    {
        question: "If a circle has radius 7 cm, what is its diameter?",
        options: ["7 cm", "14 cm", "21 cm", "49 cm"],
        answer: "14 cm"
    }

];


// ==========================================
// VARIABLES
// ==========================================

let currentQuestions = [];


// ==========================================
// SHUFFLE QUESTIONS
// ==========================================

function shuffle(array) {

    return array.sort(() => Math.random() - 0.5);

}


// ==========================================
// GENERATE 5 RANDOM QUESTIONS
// ==========================================

function generateQuestions() {

    // Shuffle the question bank
    const shuffled = shuffle([...questionBank]);

    // Select only 5 questions
    currentQuestions = shuffled.slice(0, 5);

    const questionsContainer =
        document.getElementById("questions");

    questionsContainer.innerHTML = "";


    // Display the questions
    currentQuestions.forEach((question, index) => {

        const questionBox =
            document.createElement("div");

        questionBox.classList.add("question-card");


        questionBox.innerHTML = `

            <h3>
                Question ${index + 1}
            </h3>

            <p>
                ${question.question}
            </p>

            <div class="options">

                ${question.options.map((option, optionIndex) => `

                    <label class="option">

                        <input
                            type="radio"
                            name="question${index}"
                            value="${option}"
                            required
                        >

                        <span>
                            ${option}
                        </span>

                    </label>

                `).join("")}

            </div>

        `;


        questionsContainer.appendChild(questionBox);

    });

}


// ==========================================
// CHECK ANSWERS
// ==========================================

document
    .getElementById("quizForm")
    .addEventListener("submit", function(event) {

        // Prevent page refresh
        event.preventDefault();


        let score = 0;


        // Check every question
        currentQuestions.forEach((question, index) => {

            const selected =
                document.querySelector(
                    `input[name="question${index}"]:checked`
                );


            if (
                selected &&
                selected.value === question.answer
            ) {

                score++;

            }

        });


        // Display result
        const result =
            document.getElementById("result");


        result.innerHTML = `
        
            <h2>Your Score</h2>

            <p>
                You scored
                <strong>${score}</strong>
                out of
                <strong>5</strong>.
            </p>

        `;


        // Give feedback
        if (score === 5) {

            result.innerHTML +=
                "<p>Excellent! 🎉</p>";

        }

        else if (score >= 3) {

            result.innerHTML +=
                "<p>Good work! Keep practicing. 👍</p>";

        }

        else {

            result.innerHTML +=
                "<p>Keep studying and try again. 📚</p>";

        }


        // Change the questions after submission
        setTimeout(() => {

            generateQuestions();

            result.innerHTML = `
                <p class="new-questions">
                    🔄 New questions loaded. Try again!
                </p>
            `;

            // Scroll back to the questions
            document
                .getElementById("questions")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 1500);

    });


// ==========================================
// LOAD FIRST SET OF QUESTIONS
// ==========================================

generateQuestions();