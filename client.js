const allwords = document.getElementById("gameArea");

document.addEventListener("keydown", keyPress);

var currentAttempts = 0; // this will let us know what row to input a given letter
var currentLetter = 0; // this will tell us where the next inputted letter goes
const maxAttempts = 5;
var wordLength = 5;
var answer = "geode";
var canType = true;

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
        //display congrats
        //TODO: share score with friends maybe
        
}

function checkWord(word) {
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
    if (word == answer) {
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
            submitWord(concatIntoWord(allwords.children[currentAttempts]));
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