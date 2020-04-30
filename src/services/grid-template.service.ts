/**
 * Get the class name for the Letter span based on the row and column index.
 *
 * @param {number} rowIndex - Guess Word row index.
 * @param {number} letterIndex - Index of the letter position of the Guess Word.
 * @returns {string} - Text used to set the HTML class name.
 */
export const getLetterClassName = (rowIndex: number, letterIndex: number) => `r${rowIndex}l${letterIndex}`;

/**
 * Get the CSS Grid template areas value based on the Actual Word length.
 *
 * @param {number} actualWordLength - Actual Word length.
 * @returns {string} - Text used to see the CSS Grid template areas.
 */
export const getLetterGridTemplateAreas = (actualWordLength: number) => `TODO: ${actualWordLength}`;
