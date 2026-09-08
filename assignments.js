```javascript
// ============================================
// ASSIGNMENT SYSTEM
// ============================================

// Get the questions container
const questionsContainer = document.getElementById("questions");

// Get the assignment form
const assignmentForm = document.getElementById("assignmentForm");

// Get the result container
const resultContainer = document.getElementById("result");


// ============================================
// DETERMINE WHICH ASSIGNMENT WAS SELECTED
// ============================================

const urlParams = new URLSearchParams(window.location.search);

const assignmentType =
    urlParams.get("assignment") ||
    urlParams.get("subject") ||
    "cs-introduction";


// ============================================
// GET THE CORRECT QUESTION BANK
// ============================================

let selectedQuestions = questionBanks[assignmentType];


// If the requested assignment does not exist,
// use Computer Science Introduction as default.

if (!selectedQuestions) {
    selectedQuestions = questionBanks["cs-introduction"];
}


// ============================================
// ASSIGNMENT TITLES
// ============================================

const assignmentTitles = {

    "cs-introduction":
        "Computer Science Introduction Assignment",

    "computer-systems":
        "Computer Systems Assignment",

    "algorithms":
        "Algorithms Assignment"

};


// ============================================
// CHANGE PAGE TITLE
// ============================================

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

        questionDiv.className =
            "question";


        // Question number and question
        const questionTitle =
            document.createElement("h3");

        questionTitle.textContent =
            `${index + 1}. ${item.question}`;


        questionDiv.appendChild(questionTitle);


        // Create answer options
        item.options.forEach(function (option, optionIndex) {

            const label =
                document.createElement("label");

            label.className =
                "option";


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
                document.createTextNode(
                    " " + option
                )
            );


            questionDiv.appendChild(label);

        });


        questionsContainer.appendChild(
            questionDiv
        );

    });

}


// ============================================
// DISPLAY QUESTIONS WHEN PAGE LOADS
// ============================================

displayQuestions();


// ============================================
// SUBMIT ASSIGNMENT
// ============================================

if (assignmentForm) {

    assignmentForm.addEventListener(
        "submit",
        function (event) {

            // Stop page from refreshing
            event.preventDefault();


            let score = 0;


            // Check every question
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


            // Calculate percentage
            const total =
                selectedQuestions.length;

            const percentage =
                Math.round((score / total) * 100);


            // Display result
            if (resultContainer) {

                resultContainer.innerHTML = `
                    <div class="result-box">
                        <h2>Assignment Completed 🎉</h2>

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
```
