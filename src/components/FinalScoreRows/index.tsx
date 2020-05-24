import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  /** The score for each guess word. */
  scores: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,

  /** The max length of the Actual Word. */
  actualWordLength: PropTypes.number.isRequired,
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <FinalScoreRows /> displays the bonus and final score rows.
 *
 * @returns {object} - a bunch of <span> tags
 */
const FinalScoreRows: React.FC<props> = ({ scores, actualWordLength }) => {
  const bonusScore = scores[scores.length - 1] === actualWordLength * 1000 ? 3000 : 0;
  const finalScore = scores.reduce((sum, currentValue) => sum + currentValue, 0);

  return (
    <>
      <tr>
        <td colSpan={actualWordLength}>Bonus Points:</td>
        <td>{bonusScore}</td>
      </tr>
      <tr>
        <td colSpan={actualWordLength}>Final Score:</td>
        <td>{finalScore}</td>
      </tr>
    </>
  );
};

FinalScoreRows.propTypes = propTypes;

export { FinalScoreRows };
