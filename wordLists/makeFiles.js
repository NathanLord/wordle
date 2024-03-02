
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


// Text file and length 
const dictionaryFilePath = 'dictionary.txt'; // Path to your dictionary text file


// Read dictionary from file
const dictionary = readDictionaryFromFile(dictionaryFilePath);


// TODO Make seperate word length text files
for(let i = 4; i<9; i++){
    const wordsOfLength = dictionary.filter(word => word.length === i);
    const fileName = `./words${i}.txt`;
    fs.writeFileSync(fileName, wordsOfLength.join('\n'));
}
