
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const sendButton = document.getElementById("sendButton");


chatForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const message = chatInput.value.trim();

    if (!message) {
        return;
    }


    // Show the student's message
    addMessage(message, "user");


    // Clear the input
    chatInput.value = "";


    // Disable button while AI is thinking
    sendButton.disabled = true;

    sendButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Thinking...';


    // Show temporary AI message
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


        // Replace "Thinking..." with the real answer
        thinkingMessage.querySelector(
            ".message-content p"
        ).textContent = data.reply;


    } catch (error) {

        console.error("AI error:", error);


        thinkingMessage.querySelector(
            ".message-content p"
        ).textContent =
            "Sorry, I couldn't connect to the AI right now. Please try again.";

    }


    // Enable button again
    sendButton.disabled = false;

    sendButton.innerHTML =
        '<i class="fa-solid fa-paper-plane"></i> <span>Send</span>';


    // Scroll to latest message
    chatMessages.scrollTop =
        chatMessages.scrollHeight;

});



function addMessage(text, sender) {

    const messageDiv =
        document.createElement("div");


    messageDiv.className =
        sender === "user"
            ? "user-message"
            : "ai-message";


    const icon =
        sender === "user"
            ? "fa-user"
            : "fa-robot";


    messageDiv.innerHTML = `

        <div class="message-icon">

            <i class="fa-solid ${icon}"></i>

        </div>

        <div class="message-content">

            <p></p>

        </div>

    `;


    messageDiv.querySelector(
        ".message-content p"
    ).textContent = text;


    chatMessages.appendChild(messageDiv);


    // Scroll down
    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    return messageDiv;

}

