import fs from 'fs';
import fetch from 'node-fetch';

const words = fetch('https://github.com/meetDeveloper/freeDictionaryAPI/raw/master/meta/wordList/english.txt')
  .then(res => res.text())
  .then(text => text.split('\n'))
  .then(words => words.filter(word => word.search(/^[a-z]{6,7}$/) === 0))
  .then(words => {
    const sixLetterWords = words.filter(word => word.length === 6);
    fs.writeFileSync('./src/wordList/6-letter-words.json', JSON.stringify(sixLetterWords));

    const sevenLetterWords = words.filter(word => word.length === 7);
    fs.writeFileSync('./src/wordList/7-letter-words.json', JSON.stringify(sevenLetterWords));
  });
