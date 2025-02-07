const chatBox = document.getElementById("chat-box");

// Function to Send Message
function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    addMessage(userInput, "user");
    document.getElementById("user-input").value = "";

    // Show Typing Animation
    let typingIndicator = document.createElement("p");
    typingIndicator.classList.add("typing");
    typingIndicator.textContent = "Bot is typing...";
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate Delay Before Bot Responds
    setTimeout(() => {
        chatBox.removeChild(typingIndicator);
        let responseText = getBotResponse(userInput);
        addMessage(responseText, "bot");
        speakText(responseText);
    }, 1500);
}

// Function to Add Messages to Chat
function addMessage(text, sender) {
    let message = document.createElement("p");
    message.classList.add(sender);
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Play Message Sound
    let sound = new Audio(sender === "user" ? "send.mp3" : "receive.mp3");
    sound.play();
}

// Basic AI Bot Responses
function getBotResponse(input) {
    input = input.toLowerCase();

    // Predefined Responses
    if (input.includes("hello") || input.includes("hi")) return "Hi there! How can I assist you?";
    if (input.includes("how are you")) return "I'm good, thanks for asking!";
    if (input.includes("bye")) return "Goodbye! Have a nice day!";
    if (input.includes("who made you") || input.includes("who created you")) return "I was created by Tushar Kaushik!";
    if (input.includes("what is your name")) return "My name is Avni! i am your virtual assistant.";
    if (input.includes("what can you do")) return "I can chat with you, answer questions, tell jokes, and much more!";
    if (input.includes("where do you live")) return "I live inside this website, powered by code!";
    if (input.includes("tell me a joke")) return "Why don’t programmers like nature? Because it has too many bugs!";
    if (input.includes("what is your favorite color")) return "I love blue! It's the color of the internet.";
    if (input.includes("who is your best friend")) return "You are my best friend! I love talking to you.";
    if (input.includes("do you like humans")) return "Of course! You created me!";
    if (input.includes("what is your purpose")) return "My purpose is to assist you and make conversations fun!";
    if (input.includes("who is your favorite superhero")) return "I like Iron Man! He's smart and innovative, just like my creator.";
    
    return "I'm not sure about that. Can you ask something else?";
}

// Text-to-Speech Function
function speakText(text) {
    let speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

// Dark Mode Toggle
document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    this.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Voice Input
document.getElementById("voice-btn").addEventListener("click", function () {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.onstart = function () {
        document.getElementById("voice-btn").textContent = "🎙️ Listening...";
    };

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript;
        document.getElementById("user-input").value = transcript;
        sendMessage();
    };

    recognition.onerror = function () {
        document.getElementById("voice-btn").textContent = "🎤";
    };

    recognition.onend = function () {
        document.getElementById("voice-btn").textContent = "🎤";
    };

    recognition.start();
});