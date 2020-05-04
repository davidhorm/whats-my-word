/**
 * Get the grid row template with dots and quotes around the grid column names.
 *
 * @param {string} gridColumnNames - Grid Column Names
 * @returns {string} - Grid Column Names wraped in dots and quotes.
 */
const getGridRowTemplate = (gridColumnNames: string) => `". ${gridColumnNames} ."`;

// #region getActualLettersRow

/**
 * Get the class/grid area name for the Actual Letter span based column index.
 *
 * @param {number} letterIndex - Index of the letter position of the Actual Word.
 * @returns {string} - Text used to set the HTML class/grid area name.
 */
export const getActualLetterGridAreaName = (letterIndex: number) => `actual-letter-${letterIndex}`;

/**
 * Get the Grid Column Names for the letters of the actual word.
 *
 * @param {number} actualWordLength - Actual Word length.
 * @returns {string[]} - Grid Column Names for the letters of the actual word.
 */
const getActualLettersRow = (actualWordLength: number) => {
  const actualLetters = new Array(actualWordLength + 1)
    .fill('')
    .map((_, actualLetterIndex) =>
      actualLetterIndex < actualWordLength ? getActualLetterGridAreaName(actualLetterIndex) : '.'
    )
    .join(' ');

  return [getGridRowTemplate(actualLetters)];
};

// #endregion getActualLettersRow

// #region getFinalScoreRows

export const GRID_AREA_NAMES = {
  BONUS_SCORE_LABEL: 'bonus-score-label',
  BONUS_SCORE_VALUE: 'bonus-score',
  FINAL_SCORE_LABEL: 'final-score-label',
  FINAL_SCORE_VALUE: 'final-score',
};

/**
 * Get the Grid Column Names for the bonus and final scoring rows.
 *
 * @param {number} actualWordLength - Actual Word length.
 * @returns {string[]} - Grid Column Names for the bonus and final scoring rows.
 */
const getFinalScoreRows = (actualWordLength: number) => {
  const bonusScoreRow = new Array(actualWordLength)
    .fill(GRID_AREA_NAMES.BONUS_SCORE_LABEL)
    .concat([GRID_AREA_NAMES.BONUS_SCORE_VALUE])
    .join(' ');

  const finalScoreRow = new Array(actualWordLength)
    .fill(GRID_AREA_NAMES.FINAL_SCORE_LABEL)
    .concat([GRID_AREA_NAMES.FINAL_SCORE_VALUE])
    .join(' ');

  return [getGridRowTemplate(bonusScoreRow), getGridRowTemplate(finalScoreRow)];
};

// #endregion getFinalScoreRows

// #region getGuessLetterRows

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
export const getGuessLetterGridAreaName = (rowIndex: number, letterIndex: number) =>
  `row-${rowIndex}-letter-${letterIndex}`;

/**
 * Get the Grid Column Names for the letters of the guess word, and score column.
 *
 * @param {number} actualWordLength - Actual Word length.
 * @returns {string[]} - Grid Column Names for the letters of the guess word, and score column.
 */
const getGuessLetterRows = (actualWordLength: number) => {
  const guessWordStartIndexes = [0, 0, 1, 2, 3, 2, 1, 0, 0, 1, 0];
  const guessWordLengths = [-4, -3, -3, -3, -3, -2, -2, -2, -1, -1, 0];

  return guessWordStartIndexes.map((guessWordStartIndex, rowIndex) => {
    const guessWordLength = actualWordLength + guessWordLengths[rowIndex];

    const emptySpacesBeforeLetters = guessWordStartIndex + 1;
    const dotsBeforeLetters = new Array(emptySpacesBeforeLetters).join('. ');

    const emptySpacesAfterLetters = actualWordLength - guessWordStartIndex - guessWordLength + 1;
    const dotsAfterLetters = new Array(emptySpacesAfterLetters).join('. ');

    const letterGridAreaNames = new Array(guessWordLength)
      .fill('')
      .map((_, guessWordLetterIndex) => `${getGuessLetterGridAreaName(rowIndex, guessWordLetterIndex)} `)
      .join('');

    const gridColumnNames = `${dotsBeforeLetters}${letterGridAreaNames}${dotsAfterLetters}${getScoreGridAreaName(
      rowIndex
    )}`;
    return getGridRowTemplate(gridColumnNames);
  });
};

// #endregion getGuessLetterRows

/**
 * Get the CSS Grid template areas value based on the Actual Word length.
 *
 * @param {number} actualWordLength - Actual Word length.
 * @returns {string} - Text used to see the CSS Grid template areas.
 */
export const getGridTemplateAreas = (actualWordLength: number) => {
  const actualLettersRow = getActualLettersRow(actualWordLength);
  const guessLetterRows = getGuessLetterRows(actualWordLength);
  const finalScoreRows = getFinalScoreRows(actualWordLength);

  return actualLettersRow.concat(guessLetterRows).concat(finalScoreRows).join(' ');
};
