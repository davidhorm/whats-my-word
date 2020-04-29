/**
 * Get the score of the Guess Word.
 *
 * @param {number} startIndex - Start index of the Guess Word.
 * @param {string} guessWord - Guess Word
 * @param {string} actualWord - Actual Word
 * @returns {number} - Score of the Guess Word.
 */
const getGuessWordScore = (startIndex: number, guessWord: string, actualWord: string): number =>
  startIndex + guessWord.length + actualWord.length;

export { getGuessWordScore };
