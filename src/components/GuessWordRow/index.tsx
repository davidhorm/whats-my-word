import PropTypes from 'prop-types';
import React from 'react';

/**
 * Returns an array to be deconstructed as [before, after].
 * `before` is the number of empty spaces before the letters.
 * `after` is the number of empty spaces after the letters.
 *
 * @param {number} rowIndex - Guess Word row index.
 * @returns {number[]} - number of cells [before, after] the letters.
 */
const getNumberOfEmptyCells = (rowIndex: number) => {
  return [
    [0, 4],
    [0, 3],
    [1, 2],
    [2, 1],
    [3, 0],
    [2, 0],
    [1, 1],
    [0, 2],
    [0, 1],
    [1, 0],
    [0, 0],
  ][rowIndex];
};

const propTypes = {
  /** The row index of the Guess Word. */
  rowIndex: PropTypes.number.isRequired,

  /** The Guess Word. */
  guessWord: PropTypes.string,

  /** The Guess Word Score. */
  guessWordScore: PropTypes.number,
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <GuessWordRow /> displays the letters of the guess word in individual <span> tags with grid-area styles.
 *
 * @returns {object} - a bunch of <span> tags
 */
const GuessWordRow: React.FC<props> = ({ rowIndex, guessWord, guessWordScore }) => {
  const [before, after] = getNumberOfEmptyCells(rowIndex);
  const letters = new Array(before).fill('').concat(guessWord?.split('')).concat(new Array(after).fill(''));

  return (
    <tr>
      {letters.map((letter: string, letterIndex: number) => {
        const key = `letter-${rowIndex}-${letterIndex}`;
        return <td key={key}>{letter || <span>&nbsp;</span>}</td>;
      })}
      <td>{guessWordScore}</td>
    </tr>
  );
};

GuessWordRow.propTypes = propTypes;

export { GuessWordRow };
