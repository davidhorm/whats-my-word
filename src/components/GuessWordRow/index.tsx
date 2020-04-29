import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  /** The Start Index of the Guess Word. */
  startIndex: PropTypes.number,

  /** The Guess Word. */
  guessWord: PropTypes.string,
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <GuessWordRow /> displays the letters of the guess word in a grid.
 *
 * @returns {object} - a bunch of <span> tags
 */
const GuessWordRow: React.FC<props> = ({ startIndex, guessWord }) => {
  return (
    <span>
      startIndex: {startIndex}; guessWord: {guessWord}
    </span>
  );
};

GuessWordRow.propTypes = propTypes;

export { GuessWordRow };
