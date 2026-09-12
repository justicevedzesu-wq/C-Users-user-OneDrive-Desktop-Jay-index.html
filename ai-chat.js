/* =========================================
   STUDY AI CHAT
========================================= */

const aiChatButton = document.getElementById("aiChatButton");
const aiChatBox = document.getElementById("aiChatBox");
const aiClose = document.getElementById("aiClose");

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const sendButton = document.getElementById("sendButton");


/* =========================================
   OPEN CHAT
========================================= */

aiChatButton.addEventListener("click", function () {

    aiChatBox.classList.add("active");

    chatInput.focus();

});


/* =========================================
   CLOSE CHAT
========================================= */

aiClose.addEventListener("click", function () {

    aiChatBox.classList.remove("active");

});


/* =========================================
   SEND MESSAGE
========================================= */

chatForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const message = chatInput.value.trim();

    if (!message) {
        return;
    }


    // Show user's message
    addMessage(message, "user");


    // Clear input
    chatInput.value = "";


    // Disable send button
    sendButton.disabled = true;

    sendButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i>';


    // Show thinking message
    const thinkingMessage = addMessage(
        "Thinking...",
        "ai"
    );


    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.error || "Something went wrong."
            );

        }


        // Display AI response
        thinkingMessage
            .querySelector(".message-content p")
            .textContent = data.reply;


    } catch (error) {

        console.error("AI error:", error);


        thinkingMessage
            .querySelector(".message-content p")
            .textContent =
                "Sorry, I couldn't connect to the AI right now. Please try again.";

    }


    // Enable button again
    sendButton.disabled = false;

    sendButton.innerHTML =
        '<i class="fa-solid fa-paper-plane"></i>';


    // Scroll to newest message
    chatMessages.scrollTop =
        chatMessages.scrollHeight;

});


/* =========================================
   ADD MESSAGE
========================================= */

function addMessage(text, sender) {

    const messageDiv =
        document.createElement("div");


    messageDiv.className =
        sender === "user"
            ? "user-message"
            : "ai-message";


    if (sender === "user") {

        messageDiv.innerHTML = `
            <div class="message-content">
                <p></p>
            </div>
        `;

    } else {

        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fa-solid fa-robot"></i>
            </div>

            <div class="message-content">
                <p></p>
            </div>
        `;

    }


    messageDiv
        .querySelector(".message-content p")
        .textContent = text;


    chatMessages.appendChild(messageDiv);


    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    return messageDiv;

}
