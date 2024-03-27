//interacts with html
const allwords = document.getElementById("gameArea");
//const fs = require('fs');

document.addEventListener("keydown", keyPress);
document.getElementById("balls").onchange = changeWordLength;

const letterPlaceholder = document.getElementById("letterPlaceholder");

var currentAttempts = 0; // this will let us know what row to input a given letter
var currentLetter = 0; // this will tell us where the next inputted letter goes
const maxAttempts = 5;
var wordLength = 5;
var answer = "geode";
var canType = true;

// Reactive display for length of word
function changeWordLength() {
    var len = document.getElementById("balls").value;
    wordLength = len;
    if (len > 8) len = 8;
    if (len < 4) len = 4;

    //TODO: set random word to main.js/getrandomwordoflength(len)

    // insert all the character input boxes
    for(var i = 0; i < 5; i++) {
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
        //display congrats
        //TODO: share score with friends maybe
        
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

// START: GETTING RANDOM WORD FROM FILE ----------------------------
function getRandomWord(wordLength) {
    const dictionary = readDictionaryFromFile(`./wordLists/words${wordLength}`);

    var ran = Math.random();
    return dictionary[1]; // TODO
}
function readDictionaryFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.trim().split('\n');
    } catch (err) {
        console.error('Error reading dictionary file:', err);
        return [];
    }
}


// END: GETTING RANDOM WORD FROM FILE ----------------------------