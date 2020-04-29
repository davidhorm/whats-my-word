import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  /** The score for each guess word. */
  scores: PropTypes.arrayOf(PropTypes.number),
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <ScoreColumn /> displays the score for each Guess Word Row. Will automatically add the bonus points.
 *
 * @returns {object} - a bunch of <span> tags
 */
const ScoreColumn: React.FC<props> = ({ scores }) => {
  return <span>scores: {scores}</span>;
};

ScoreColumn.propTypes = propTypes;

export { ScoreColumn };
