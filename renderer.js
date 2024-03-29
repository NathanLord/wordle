//interacts with html
const allwords = document.getElementById("gameArea");
//const fs = require('fs');

document.addEventListener("keydown", keyPress);
document.getElementById("inputVal").onchange = changeWordLength;

const letterPlaceholder = document.getElementById("letterPlaceholder");

var currentAttempts = 0; // this will let us know what row to input a given letter
var currentLetter = 0; // this will tell us where the next inputted letter goes
const maxAttempts = 5; // max guesses
var wordLength = 5;
var answer = "geode";
var canType = false;


// Reactive display for length of word
function changeWordLength() {
    var lenInput = document.getElementById("inputVal")
    var len = lenInput.value;
    wordLength = len;
    if (len > 8) len = 8;
    if (len < 4) len = 4;
    
    canType = true; // everytime you generate a new word allow the user to type
    // Request a new word with this length
    window.api.send("request-random-word", len);


    //TODO: set random word to main.js/getrandomwordoflength(len)

    // insert all the character input boxes
    for(var i = 0; i < maxAttempts; i++) { // 5 guesses
        var parent = allwords.children[i];
        parent.innerHTML = ""; // remove all children
        for(var j = 0; j < len; j++) { // this can be fixed by copying the whole row after doing 1
            var clone = letterPlaceholder.cloneNode(true); // "deep" clone
            clone.classList.remove("placeholder");
            parent.insertBefore(clone, parent.firstChild);
        }
    }
    //TODO change the answer to be of that word length
}



//word validation to see if word user entered is in our dictionary
function isInDictionary(word, dictionary) {
    
}

function concatIntoWord(listOfLetters) {
    let word = "";
    for(let letter = 0; letter < wordLength; letter++) {
        word = word + listOfLetters.children[letter].innerHTML;
    }
    return word;
}
function win() {
    // things to do if win
    //dont let them move to the next row
    canType = false;
    //display congrats message that fades out
    var congratsMessage = document.getElementById("congratsArea");
    congratsMessage.style.opacity = "1";// Initially visible
    congratsMessage.textContent = "Congrats!";
    congratsMessage.style.fontFamily = "'Helvetica', 'Gotham', 'Arial'";
    congratsMessage.style.fontSize = "4vw"; // Adjust font size relative 
    congratsMessage.style.color = "white"; 
    congratsMessage.style.transition = "opacity 1s ease-in"; // Transition for gradual appearance 

    // Make it appear slowly 
    setTimeout(function() {
        congratsMessage.style.opacity = "0"; // fades out
    }, 1000);

    // Remove the congrats message 
    setTimeout(function() {
        congratsMessage.style.display = "none"; // is removed
    }, 3000);


    //TODO: share score with friends maybe


    // Set background animations
    triggerFireworks();
        
}

function checkWord(word) { // check and update each letter based on if its in the word and/or in the correct order
    var allLetters = allwords.children[currentAttempts].children; //every span(letter)
    for(let i = 0; i < wordLength; i++) {
        if (word[i] == answer[i]) { //green
            allLetters[i].style.backgroundColor = "green";
        } else if (answer.indexOf(word[i]) != -1) { //yellow
            allLetters[i].style.backgroundColor = "yellow";
        } else {//grey
            allLetters[i].style.backgroundColor = "grey";
        }
    }
    if (word === answer) { // old bug, have to trim() the end of both word and answer even if they look equal
        win();
    }
}
function submitWord(word) {
    // check each letter and assign color
    checkWord(word);
    currentAttempts++;
    currentLetter = 0;
}

function keyPress(e) {
    if (!canType) {
        return;
    }
    var theKey = e.key;
    if (theKey == "Enter") { // submit all letters as a word guess
        if (currentLetter == wordLength) {
            // concatonate all the letters and submit it
            console.log("YO PRESSED ENTERS ")
            submitWord(concatIntoWord(allwords.children[currentAttempts]).trim());
            document.getElementById("inputVal").disabled = true; // Disable input length after first attempt is made
        }
        return;
    }
    if (theKey == "Backspace") { // remove last letter inputted
        if (currentLetter <= 0) return;
        currentLetter--;
        allwords.children[currentAttempts].children[currentLetter].innerHTML = "";
        return;
    }
    if (isTypableKey(theKey)) { // enter a new letter into the currentLetter box
        if (currentLetter >= wordLength) return;
        allwords.children[currentAttempts].children[currentLetter].innerHTML = theKey;
        currentLetter++;
    }
}

function isTypableKey(key) {
    if (key.length > 1) return false;
    return (key >= 'A' && key <= 'Z') || (key >= 'a' && key <= 'z');
}

// EVENT called from main to use a new random word

window.api.receive('set-answer', (newWord) => {
    answer = newWord.trim();
    console.log("new word is " + answer);
});



// END: GETTING RANDOM WORD FROM FILE ----------------------------


// ! Firework Function https://www.jsdelivr.com/package/npm/particlesjs 
function triggerFireworks() {
    particlesJS('fireworks', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": false,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}