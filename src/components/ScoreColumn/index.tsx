import PropTypes from 'prop-types';
import React from 'react';
import { getScoreGridAreaName, GRID_AREA_NAMES } from '../../services/grid-template.service';

const propTypes = {
  /** The score for each guess word. */
  scores: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,

  /** The max length of the Actual Word. */
  actualWordLength: PropTypes.number.isRequired,
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <ScoreColumn /> displays the score for each Guess Word Row. Will automatically add the bonus points.
 *
 * @returns {object} - a bunch of <span> tags
 */
const ScoreColumn: React.FC<props> = ({ scores, actualWordLength }) => {
  const bonusScore = scores[scores.length - 1] === actualWordLength * 1000 ? 3000 : 0;
  const finalScore = scores.reduce((sum, currentValue) => sum + currentValue, 0);

  return (
    <>
      {scores?.map((score, rowIndex) => (
        <span style={{ gridArea: getScoreGridAreaName(rowIndex) }}>{score}</span>
      ))}
      <span style={{ gridArea: GRID_AREA_NAMES.BONUS_SCORE_LABEL }}>Bonus Points:</span>
      <span style={{ gridArea: GRID_AREA_NAMES.BONUS_SCORE_VALUE }}>{bonusScore}</span>
      <span style={{ gridArea: GRID_AREA_NAMES.FINAL_SCORE_LABEL }}>Final Score:</span>
      <span style={{ gridArea: GRID_AREA_NAMES.FINAL_SCORE_VALUE }}>{finalScore}</span>
    </>
  );
};

ScoreColumn.propTypes = propTypes;

export { ScoreColumn };
