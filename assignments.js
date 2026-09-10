
// ============================================
// ASSIGNMENT SYSTEM
// ============================================

const questionsContainer = document.getElementById("questions");
const assignmentForm = document.getElementById("assignmentForm");
const resultContainer = document.getElementById("result");


// Get assignment type from the URL

const urlParams = new URLSearchParams(window.location.search);

const assignmentType =
    urlParams.get("assignment") ||
    urlParams.get("subject") ||
    "cs-introduction";


// Select the correct question bank

let selectedQuestions = questionBanks[assignmentType];


// If assignment doesn't exist, use Computer Science Introduction

if (!selectedQuestions) {
    selectedQuestions = questionBanks["cs-introduction"];
}


// Assignment titles

const assignmentTitles = {

    "cs-introduction":
        "Computer Science Introduction Assignment",

    "computer-systems":
        "Computer Systems Assignment",

    "algorithms":
        "Algorithms Assignment"

};


// Change the title on the page

const titleElement =
    document.getElementById("assignmentTitle");

const descriptionElement =
    document.getElementById("assignmentDescription");


if (titleElement) {

    titleElement.textContent =
        assignmentTitles[assignmentType] ||
        "Assignment";

}


if (descriptionElement) {

    descriptionElement.textContent =
        `Answer all ${selectedQuestions.length} questions carefully.`;

}


// ============================================
// DISPLAY QUESTIONS
// ============================================

function displayQuestions() {

    if (!questionsContainer) {

        console.error("Questions container not found.");

        return;
    }


    questionsContainer.innerHTML = "";


    selectedQuestions.forEach(function (item, index) {

        // Create question container

        const questionDiv =
            document.createElement("div");

        questionDiv.className = "question";


        // Create question heading

        const questionTitle =
            document.createElement("h3");

        questionTitle.textContent =
            `${index + 1}. ${item.question}`;


        questionDiv.appendChild(questionTitle);


        // Create answer options

        item.options.forEach(function (option) {

            const label =
                document.createElement("label");

            label.className = "option";


            const radio =
                document.createElement("input");

            radio.type = "radio";

            radio.name =
                `question${index}`;

            radio.value =
                option;

            radio.required = true;


            label.appendChild(radio);

            label.appendChild(
                document.createTextNode(" " + option)
            );


            questionDiv.appendChild(label);

        });


        questionsContainer.appendChild(questionDiv);

    });

}


// Display questions when page loads

displayQuestions();


// ============================================
// SUBMIT ASSIGNMENT
// ============================================

if (assignmentForm) {

    assignmentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            let score = 0;


            // Check every answer

            selectedQuestions.forEach(
                function (item, index) {

                    const selectedAnswer =
                        document.querySelector(
                            `input[name="question${index}"]:checked`
                        );


                    if (
                        selectedAnswer &&
                        selectedAnswer.value === item.answer
                    ) {

                        score++;

                    }

                }
            );


            // Calculate result

            const total =
                selectedQuestions.length;

            const percentage =
                Math.round(
                    (score / total) * 100
                );


            // Display result

            if (resultContainer) {

                resultContainer.innerHTML = `

                    <div class="result-box">

                        <h2>
                            Assignment Completed 🎉
                        </h2>

                        <p>
                            You scored
                            <strong>${score}</strong>
                            out of
                            <strong>${total}</strong>.
                        </p>

                        <p>
                            Percentage:
                            <strong>${percentage}%</strong>
                        </p>

                        <button
                            type="button"
                            onclick="location.reload()"
                        >
                            Try Again
                        </button>

                    </div>

                `;

            }


            // Scroll to result

            if (resultContainer) {

                resultContainer.scrollIntoView({
                    behavior: "smooth"
                });

            }


            // Disable submit button

            const submitButton =
                assignmentForm.querySelector(
                    ".submit-btn"
                );


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML =
                    '<i class="fa-solid fa-check"></i> Submitted';

            }

        }
    );

}

