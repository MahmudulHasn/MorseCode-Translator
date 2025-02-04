// Morse code dictionary mapping Morse symbols to their corresponding English letters/numbers
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

// Variables for handling Morse code input and output
let morseInput = "";  // The current Morse code being entered (dots and dashes)
let textOutput = "";  // The translated text output
let startTime;  // Start time for measuring the duration of a key press
let timeout;  // Timeout for processing input after a delay
let morseDiv = document.getElementById("morse");  // The div showing current Morse input
let outputDiv = document.getElementById("output");  // The div showing the translated output text
let suggestionDiv = document.getElementById("suggestion");  // The div for showing suggestions for Morse input
let morseKeyboard = document.getElementById("morse-keyboard");  // The Morse code keyboard for small screens

//==============================================================================
// Function to check screen size and show or hide the Morse keyboard accordingly
//==============================================================================

function checkScreenSize() {
    if (window.innerWidth <= 768) {
        morseKeyboard.classList.remove("hidden");  // Show the keyboard on small screens
    } else {
        morseKeyboard.classList.add("hidden");  // Hide the keyboard on large screens
    }
}

window.addEventListener("resize", checkScreenSize);  // Re-check screen size on window resize
window.addEventListener("load", checkScreenSize);  // Check screen size when the page loads

//==========================================
// Keyboard input handling for large screens
//==========================================

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !startTime) {  // Start measuring time when space is pressed
        startTime = Date.now();
        event.preventDefault();  // Prevent the default space behavior (scrolling)
        clearTimeout(timeout);  // Clear any previous timeout
    } else if (event.code === "Backspace") {  // Handle the backspace key
        event.preventDefault();
        backspace();  // Call backspace function to delete input/output
    }
});

document.addEventListener("keyup", function (event) {
    if (event.code === "Space") {  // When the space key is released
        let duration = Date.now() - startTime;  // Measure the duration of the key press
        startTime = null;  // Reset the start time
        morseInput += duration < 300 ? "." : "-";  // Append a dot (.) for short press or dash (-) for long press
        morseDiv.innerText = morseInput;  // Update the Morse input display
        updateSuggestion();  // Update suggestion for the current Morse input
        
        // Process the input after a delay (to allow multiple inputs)
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            processMorseInput();  // Translate the Morse code after the delay
        }, 700);  // Set delay for processing Morse input
    } else if (event.code === "Enter") {  // Handle the Enter key (to insert a space)
        enter();
    }
});

//=======================================================================
// Handling touch events for Morse code keyboard buttons on small screens
//=======================================================================

let spacebarButton = document.querySelector("#morse-keyboard .spacebar-btn");

spacebarButton.addEventListener("touchstart", function () {
    startTime = Date.now();  // Record the time when the spacebar button is pressed
});

spacebarButton.addEventListener("touchend", function () {
    let duration = Date.now() - startTime;  // Measure the duration of the button press
    startTime = null;  // Reset the start time
    morseInput += duration < 300 ? "." : "-";  // Append a dot or dash based on the duration of the press
    morseDiv.innerText = morseInput;  // Update the Morse input display
    updateSuggestion();  // Update suggestion for the current Morse input
    
    // Process the input after a delay (to allow multiple inputs)
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        processMorseInput();  // Translate the Morse code after the delay
    }, 700);  // Set delay for processing Morse input
});


//=======================================================================
// Function to handle the Enter key for adding a space in the output text
//=======================================================================

function enter() {
    textOutput += " ";  // Add a space to the translated output
    outputDiv.innerText = textOutput;  // Update the output display
}

//=====================================================================
// Function to handle the Backspace key for removing the last character
//=====================================================================

function backspace() {
    if (morseInput.length > 0) {  // If there's any Morse input, clear it
        morseInput = "";
        morseDiv.innerText = "";
    } else if (textOutput.length > 0) {  // If the output text has characters, remove the last one
        textOutput = textOutput.slice(0, -1);
        outputDiv.innerText = textOutput;  // Update the output display
    }
    updateSuggestion();  // Update the suggestion for the current Morse input
}

//==================================================
// Function to process the Morse input after a delay
//==================================================

function processMorseInput() {
    if (morseInput.length > 0) {  // If there's any Morse input
        let translatedChar = morseDict[morseInput] || "$";  // Translate the Morse code to a character (or "$" if not found)
        textOutput += translatedChar;  // Append the translated character to the output
        outputDiv.innerText = textOutput;  // Update the output display
        morseInput = "";  // Clear the Morse input
        morseDiv.innerText = "";  // Clear the Morse input display
    }
}

//========================================================================
// Function to update the suggestion text (suggest a possible translation)
//========================================================================

function updateSuggestion() {
    suggestionDiv.innerText = morseDict[morseInput] ? `Did you mean: ${morseDict[morseInput]} ?` : "";  // Show suggestion if the input matches a known Morse code
}

//============================================================
// Function to clear all text and reset the Morse input/output
//============================================================

function clearText() {
    textOutput = "";  // Reset the output text
    morseInput = "";  // Reset the Morse input
    morseDiv.innerText = "";  // Clear the Morse input display
    outputDiv.innerText = "";  // Clear the output display
    suggestionDiv.innerText = "";  // Clear the suggestion text
}

//=======================================
// Function for the action of Help button
//=======================================

function toggleHelp() {
    let helpDiv = document.getElementById("help");
    helpDiv.style.display = helpDiv.style.display === "none" ? "block" : "none";
}

//=====================================
// Function to add background animation
//=====================================

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

//===================================================================
// Function that animates Morse code and then decodes it back to text
//===================================================================

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
            }, 300); // Time Morse code is visible
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


 