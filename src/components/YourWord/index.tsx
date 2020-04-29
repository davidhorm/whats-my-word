import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  /** The max length of the Actual Word. */
  actualWordLength: PropTypes.number,
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <YourWord /> allows the user to view and manage their guesses of your actual word.
 *
 * @returns {object} - I don't know yet.
 */
const YourWord: React.FC<props> = ({ actualWordLength }) => {
  return <span>actualWordLength: {actualWordLength}</span>;
};

YourWord.propTypes = propTypes;

export { YourWord };
