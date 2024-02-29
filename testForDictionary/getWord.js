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