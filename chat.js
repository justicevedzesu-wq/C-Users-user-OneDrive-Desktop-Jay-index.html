/* =========================================
   STUDY AI CHAT
========================================= */

const aiChatButton =
    document.getElementById("aiChatButton");

const aiChatBox =
    document.getElementById("aiChatBox");

const aiClose =
    document.getElementById("aiClose");

const aiInput =
    document.getElementById("aiInput");

const aiSend =
    document.getElementById("aiSend");

const aiMessages =
    document.getElementById("aiMessages");

const aiTyping =
    document.getElementById("aiTyping");


/* =========================================
   OPEN CHAT
========================================= */

aiChatButton.addEventListener("click", function () {

    aiChatBox.classList.add("active");

    aiInput.focus();

});


/* =========================================
   CLOSE CHAT
========================================= */

aiClose.addEventListener("click", function () {

    aiChatBox.classList.remove("active");

});


/* =========================================
   ADD MESSAGE
========================================= */

function addMessage(message, type) {

    const messageWrapper =
        document.createElement("div");


    if (type === "user") {

        messageWrapper.className =
            "user-message";

    } else {

        messageWrapper.className =
            "ai-message";

    }


    const messageContent =
        document.createElement("div");

    messageContent.className =
        "message-content";


    messageContent.innerHTML =
        `<p>${message}</p>`;


    if (type === "ai") {

        const avatar =
            document.createElement("div");

        avatar.className =
            "message-avatar";

        avatar.innerHTML =
            '<i class="fa-solid fa-robot"></i>';

        messageWrapper.appendChild(avatar);

    }


    messageWrapper.appendChild(
        messageContent
    );


    aiMessages.appendChild(
        messageWrapper
    );


    aiMessages.scrollTop =
        aiMessages.scrollHeight;
}


/* =========================================
   SEND MESSAGE
========================================= */

function sendMessage() {

    const message =
        aiInput.value.trim();


    if (message === "") {
        return;
    }


    /* Show user's message */

    addMessage(
        message,
        "user"
    );


    /* Clear input */

    aiInput.value = "";


    /* Show typing */

    aiTyping.classList.add(
        "active"
    );


    /*
       TEMPORARY RESPONSE

       We will replace this
       with the real AI API later.
    */

    setTimeout(function () {

        aiTyping.classList.remove(
            "active"
        );


        addMessage(
            "I'm ready to help! 🤖 Soon I'll be connected to the real AI system so I can give you detailed answers to your questions.",
            "ai"
        );

    }, 1200);

}


/* =========================================
   SEND BUTTON
========================================= */

aiSend.addEventListener(
    "click",
    sendMessage
);


/* =========================================
   ENTER KEY
========================================= */

aiInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);
