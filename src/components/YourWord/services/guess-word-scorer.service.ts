/**
 * Get the score of the Guess Word.
 *
 * @param {number} startIndex - Start index of the Guess Word.
 * @param {string} guessWord - Guess Word
 * @param {string} actualWord - Actual Word
 * @returns {number} - Score of the Guess Word.
 */
const getGuessWordScore = (startIndex: number, guessWord: string, actualWord: string): number => {
  const actualLetters = actualWord.split('');

  const scores = guessWord
    .split('')
    .map((guessLetter, guessLetterIndex): string | number => {
      // if exact match, then replace letter with 1000
      // and blank corresponding letter in `actualLetters`
      const actualLetterIndex = guessLetterIndex + startIndex;
      if (guessLetter === actualLetters[actualLetterIndex]) {
        actualLetters[actualLetterIndex] = '';
        return 1000;
      }

      return guessLetter;
    })
    .map((remainingGuessLetter): number => {
      // if remaining match, then replace letter with 250
      // and blank corresponding letter in `actualLetters`
      // else replace letter with 0
      if (typeof remainingGuessLetter === 'string') {
        const actualLetterIndex = actualLetters.indexOf(remainingGuessLetter);
        if (actualLetterIndex >= 0) {
          actualLetters[actualLetterIndex] = '';
          return 250;
        }
        return 0;
      }
      return remainingGuessLetter;
    });

  return scores.reduce((sum, currentValue) => sum + currentValue);
};

export { getGuessWordScore };
