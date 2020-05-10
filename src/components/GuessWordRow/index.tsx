import PropTypes from 'prop-types';
import React from 'react';
import { getGuessLetterGridAreaName } from '../../services/grid-template.service';

const propTypes = {
  /** The row index of the Guess Word. */
  rowIndex: PropTypes.number.isRequired,

  /** The Guess Word. */
  guessWord: PropTypes.string,

  /** The Guess Word length. Used to fill cells with blanks when the guess word is empty. */
  guessWordLength: PropTypes.number.isRequired,
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <GuessWordRow /> displays the letters of the guess word in individual <span> tags with grid-area styles.
 *
 * @returns {object} - a bunch of <span> tags
 */
const GuessWordRow: React.FC<props> = ({ rowIndex, guessWord, guessWordLength }) => {
  const letters = guessWord ? guessWord.split('') : new Array(guessWordLength).fill(null);
  return (
    <>
      {letters.map((letter, letterIndex) => (
        <span style={{ gridArea: getGuessLetterGridAreaName(rowIndex, letterIndex) }}>{letter}&nbsp;</span>
      ))}
    </>
  );
};

GuessWordRow.propTypes = propTypes;

export { GuessWordRow };
