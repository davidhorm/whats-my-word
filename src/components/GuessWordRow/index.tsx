import PropTypes from 'prop-types';
import React from 'react';
import { getLetterGridAreaName } from '../../services/grid-template.service';

const propTypes = {
  /** The row index of the Guess Word. */
  rowIndex: PropTypes.number.isRequired,

  /** The Guess Word. */
  guessWord: PropTypes.string,
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <GuessWordRow /> displays the letters of the guess word in individual <span> tags with grid-area styles.
 *
 * @returns {object} - a bunch of <span> tags
 */
const GuessWordRow: React.FC<props> = ({ rowIndex, guessWord }) => {
  const letters = guessWord?.split('');
  return (
    <>
      {letters &&
        letters.map((letter, letterIndex) => (
          <span style={{ gridArea: getLetterGridAreaName(rowIndex, letterIndex) }}>{letter}</span>
        ))}
    </>
  );
};

GuessWordRow.propTypes = propTypes;

export { GuessWordRow };
