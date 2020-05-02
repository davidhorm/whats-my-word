/**
 * Get the class/grid area name for the Letter span based on the row and column index.
 *
 * @param {number} rowIndex - Guess Word row index.
 * @returns {string} - Text used to set the HTML class/grid area name.
 */
export const getScoreGridAreaName = (rowIndex: number) => `row-${rowIndex}-score`;

/**
 * Get the class/grid area name for the Letter span based on the row and column index.
 *
 * @param {number} rowIndex - Guess Word row index.
 * @param {number} letterIndex - Index of the letter position of the Guess Word.
 * @returns {string} - Text used to set the HTML class/grid area name.
 */
export const getLetterGridAreaName = (rowIndex: number, letterIndex: number) => `row-${rowIndex}-letter-${letterIndex}`;

/**
 * Get the CSS Grid template areas value based on the Actual Word length.
 *
 * @param {number} actualWordLength - Actual Word length.
 * @returns {string} - Text used to see the CSS Grid template areas.
 */
export const getGridTemplateAreas = (actualWordLength: number) => {
  const guessWordStartIndexes = [0, 0, 1, 2, 3, 2, 1, 0, 0, 1, 0];
  const guessWordLengths = [-4, -3, -3, -3, -3, -2, -2, -2, -1, -1, 0];

  const expectedRows = guessWordStartIndexes.map((guessWordStartIndex, rowIndex) => {
    const guessWordLength = actualWordLength + guessWordLengths[rowIndex];

    const emptySpacesBeforeLetters = guessWordStartIndex + 1;
    const dotsBeforeLetters = new Array(emptySpacesBeforeLetters).join('. ');

    const emptySpacesAfterLetters = actualWordLength - guessWordStartIndex - guessWordLength + 1;
    const dotsAfterLetters = new Array(emptySpacesAfterLetters).join('. ');

    const letterGridAreaNames = new Array(guessWordLength)
      .fill('')
      .map((_, guessWordLetterIndex) => `${getLetterGridAreaName(rowIndex, guessWordLetterIndex)} `)
      .join('');

    return `". ${dotsBeforeLetters}${letterGridAreaNames}${dotsAfterLetters}${getScoreGridAreaName(rowIndex)} ."`;
  });

  return expectedRows.join(' ');
};
