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
export const getLetterGridTemplateAreas = (actualWordLength: number) => {
  const expectedRows = [
    '". r0l0 r0l1 . . . . ."',
    '". r1l0 r1l1 r1l2 . . . ."',
    '". . r2l0 r2l1 r2l2 . . ."',
    '". . . r3l0 r3l1 r3l2 . ."',
    '". . . . r4l0 r4l1 r4l2 ."',
    '". . . r5l0 r5l1 r5l2 r5l3 ."',
    '". . r6l0 r6l1 r6l2 r6l3 . ."',
    '". r7l0 r7l1 r7l2 r7l3 . . ."',
    '". r8l0 r8l1 r8l2 r8l3 r8l4 . ."',
    '". . r9l0 r9l1 r9l2 r9l3 r9l4 ."',
    '". r10l0 r10l1 r10l2 r10l3 r10l4 r10l5 ."',
  ];

  return expectedRows.join(' ');
};
