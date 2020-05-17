export const GRID_AREA_NAMES = {
  BONUS_SCORE_LABEL: 'bonus-score-label',
  BONUS_SCORE_VALUE: 'bonus-score',
  FINAL_SCORE_LABEL: 'final-score-label',
  FINAL_SCORE_VALUE: 'final-score',
};

/**
 * Get the class/grid area name for the Letter span based on the row and column index.
 *
 * @param {number} rowIndex - Guess Word row index.
 * @returns {string} - Text used to set the HTML class/grid area name.
 */
export const getScoreGridAreaName = (rowIndex: number) => `row-${rowIndex}-score`;

/**
 * The guess word lengths. Add with the actual word length to get the value.
 * The position in the array represents the row index.
 */
export const GUESS_WORD_LENGTHS = [-4, -3, -3, -3, -3, -2, -2, -2, -1, -1, 0];
