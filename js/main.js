let morseDict = {
    ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
    "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
    "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
    ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
    "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
    "--..": "Z",
    "-----": "0", ".----": "1", "..---": "2", "...--": "3",
    "....-": "4", ".....": "5", "-....": "6", "--...": "7", "---..": "8",
    "----.": "9",
    "---...": ":", "--..--": ",", "-.-.-.": ";", " ": " " // Space remains as space
};

let morseInput = "";
let textOutput = "";
let startTime;
let timeout;
let morseDiv = document.getElementById("morse");
let outputDiv = document.getElementById("output");
let suggestionDiv = document.getElementById("suggestion");

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !startTime) {
        startTime = Date.now();
        event.preventDefault();
        clearTimeout(timeout);
    }
    else if (event.code === "Backspace") {
        event.preventDefault();
        if (morseInput.length > 0) {
            morseInput = morseInput.slice(0, -1);
            morseDiv.innerText = morseInput;
        } else if (textOutput.length > 0) {
            textOutput = textOutput.slice(0, -1);
            outputDiv.innerText = textOutput;
        }
        updateSuggestion();
    }
});

document.addEventListener("keyup", function (event) {
    if (event.code === "Space") {
        let duration = Date.now() - startTime;
        startTime = null;

        morseInput += duration < 300 ? "." : "-";
        morseDiv.innerText = morseInput;
        updateSuggestion();

        timeout = setTimeout(() => {
            if (morseInput.length > 0) {
                let translatedChar = morseDict[morseInput] || "$";
                textOutput += translatedChar;
                outputDiv.innerText = textOutput;
                morseInput = "";
                morseDiv.innerText = "";
                // suggestionDiv.innerText = "";
            }
        }, 700);
    }
    else if (event.code === "Enter") {
        textOutput += " ";
        outputDiv.innerText = textOutput;
    }
});

function updateSuggestion() {
    suggestionDiv.innerText = morseDict[morseInput] ? `Did you mean: ${morseDict[morseInput]}?` : "";
}

function clearText() {
    textOutput = "";
    morseInput = "";
    morseDiv.innerText = "";
    outputDiv.innerText = "";
    suggestionDiv.innerText = "";
}

function toggleHelp() {
    let helpDiv = document.getElementById("help");
    helpDiv.style.display = helpDiv.style.display === "none" ? "block" : "none";
}

// background animation
function createMorseAnimation() {
    // Select the container where the Morse code animation will be added
    const container = document.querySelector(".background-animation");

    // Run this function repeatedly every 300 milliseconds to create a new Morse symbol
    setInterval(() => {
        // Create a new div element to represent a Morse code symbol
        const morseElement = document.createElement("div");

        // Randomly decide whether this element should be a "dot" or a "dash"
        morseElement.classList.add(Math.random() > 0.5 ? "dot" : "dash");

        // Set the text content to either "." (dot) or "-" (dash) randomly
        morseElement.innerText = Math.random() > 0.5 ? "." : "-";

        // Position the element randomly along the horizontal axis (left side)
        morseElement.style.left = Math.random() * 100 + "vw"; // Random position from 0% to 100% of viewport width

        // Start the element slightly above the viewport (to make it fall down)
        morseElement.style.top = "-5vh"; // 5% above the viewport height

        // Set a random animation duration between 4 and 8 seconds for smooth falling effect
        morseElement.style.animationDuration = Math.random() * 4 + 3 + "s";

        // Add the newly created Morse element to the container
        container.appendChild(morseElement);

        // Remove the element after 5 seconds to avoid cluttering the DOM
        setTimeout(() => morseElement.remove(), 5000);
    }, 100); // Repeat this process every 300 milliseconds
}

// Call the function to start generating Morse code animations
createMorseAnimation();


// Function that animates Morse code and then decodes it back to text
function animateMorseText(element, text) {
    let index = 0;
    function showNextLetter() {
        if (index < text.length) {
            let char = text[index].toUpperCase();
            let morse = Object.keys(morseDict).find(key => morseDict[key] === char) || char;

            // Show Morse code first
            element.textContent += morse;

            setTimeout(() => {
                // Replace Morse code with actual letter
                element.textContent = element.textContent.slice(0, -morse.length) + char;
                index++;
                setTimeout(showNextLetter, 200); // Move to the next letter
            }, 500); // Time Morse code is visible
        }
    }
    showNextLetter();
}

// Example text to animate
const text = "Morse Code Translator";
const titleElement = document.getElementById("animated-title");
const headingElement = document.getElementById("animated-heading");

// Animate both the title and the heading with the same function
animateMorseText(titleElement, text);
animateMorseText(headingElement, text);