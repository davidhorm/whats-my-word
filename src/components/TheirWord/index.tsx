import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  /** The max length of the Actual Word. */
  actualWordLength: PropTypes.number,
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <TheirWord /> allows the user to view and manage your guesses of their actual word.
 *
 * @returns {object} - I don't know yet.
 */
const TheirWord: React.FC<props> = ({ actualWordLength }) => {
  return <span>actualWordLength: {actualWordLength}</span>;
};

TheirWord.propTypes = propTypes;

export { TheirWord };
