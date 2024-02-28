const allwords = document.getElementById("gameArea");

document.addEventListener("keydown", keyPress);

var currentAttempts = 0; // this will let us know what row to input a given letter
var currentLetter = 0; // this will tell us where the next inputted letter goes
const maxAttempts = 5;
var wordLength = 5;

function concatIntoWord(listOfLetters) {
    let word = "";
    for(let letter = 0; letter < wordLength; letter++) {
        word = word + listOfLetters.children[letter].innerHTML;
    }
    return word;
}

function submitWord(word) {
    // check to make sure the user inputted at least 5 letters
    console.log(word + " was the inputted word");
}

function keyPress(e) {
    var theKey = e.key;
    if (theKey == "Enter") { // submit all letters as a word guess
        if (currentLetter == wordLength) {
            // concatonate all the letters and submit it
            submitWord(concatIntoWord(allwords.children[currentAttempts]));
        }
        return;
    }
    console.log(currentLetter);
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