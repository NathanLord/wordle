// Got word dictionary from - https://github.com/dwyl/english-words/blob/master/words.txt

// For reading text file
const fs = require('fs');

// Read the dictionary from a text file that is new-line-delimited
function readDictionaryFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.trim().split('\n');
    } catch (err) {
        console.error('Error reading dictionary file:', err);
        return [];
    }
}

// Fetch words of a specific length from the dictionary
function fetchWordsOfLength(dictionary, length) {
    return dictionary.filter(word => word.length === length);
}

// Get a random word from an array of that length
function getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function getRandomWord(wordLength) {
    const wordsOfLength = fetchWordsOfLength(dictionary, targetLength);
    getRandomWord(wordsOfLength);
}

// Text file and length 
const dictionaryFilePath = 'dictionary.txt'; // Path to your dictionary text file
const targetLength = 5; // Length of words you want to retrieve

// Read dictionary from file
const dictionary = readDictionaryFromFile(dictionaryFilePath);


if (dictionary.length > 0) {
    // Filter words by length
    const wordsOfLength = fetchWordsOfLength(dictionary, targetLength);

    if (wordsOfLength.length > 0) {
        // Get a random word
        const randomWord = getRandomWord(wordsOfLength);
        console.log(`Random word of length ${targetLength}:`, randomWord);
    } else {
        console.log(`No words found of length ${targetLength}`);
    }
} else {
    console.log('Error with txt file.');
}



// TODO Make seperate word length text files
for(let i = 4; i<9; i++){
    const wordsOfLength = dictionary.filter(word => word.length === i);
    const fileName = `./wordLists/words${i}.txt`;
    fs.writeFileSync(fileName, wordsOfLength.join('\n'));
}


// TODO Opens file and gets a random word from it 
function getRandomWordFromFile(fileName) {
    // Open the file and read it as a variable
    const file = new XMLHttpRequest();
    file.open("GET", fileName, false);
    file.onreadystatechange = function() {
      if (file.readyState === 4 && file.status === 200) {
        const lines = file.responseText.split("\n");
        // Get a random word from the file
        const randomWord = lines[Math.floor(Math.random() * lines.length)];
        // Return the random word
        return randomWord;
      }
    }
    file.send(null);
    
  }
  
  
// getRandomWordFromFile("words4.txt");
let randomWord = "geode";
switch (len) {
    case 4:
        randomWord = getRandomWordFromFile("words4.txt");
        break;
    case 5:
        randomWord = getRandomWordFromFile("words5.txt");
        break;
    case 6:
        randomWord = getRandomWordFromFile("words6.txt");
        break;
    case 7:
        randomWord = getRandomWordFromFile("words7.txt");
        break;
    case 8:
        randomWord = getRandomWordFromFile("words8.txt");
        break;
    default:
        console.log("Invalid file for the given length.");
        break;
}

console.log(randomWord)