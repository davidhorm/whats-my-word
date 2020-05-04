import PropTypes from 'prop-types';
import React from 'react';
import { getGridTemplateAreas, GRID_AREA_NAMES } from '../../services/grid-template.service';
import { GameWord } from '../GameWord';
import { GuessWordRow } from '../GuessWordRow';
import { ScoreColumn } from '../ScoreColumn';
import { getGuessWordScore } from './services/guess-word-scorer.service';

const propTypes = {
  /** The max length of the Actual Word. */
  actualWordLength: PropTypes.number.isRequired,
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <YourWord /> allows the user to view and manage their guesses of your actual word.
 *
 * @returns {object} - I don't know yet.
 */
const YourWord: React.FC<props> = ({ actualWordLength }) => {
  const gridStyle = {
    display: 'grid',
    columnGap: '1rem',
    gridTemplateColumns: '1rem',
    gridTemplateAreas: getGridTemplateAreas(actualWordLength),
  };

  const sampleActualWord = 'choose';
  const sampleGuessWords = ['by', 'now', 'are', 'sin', 'pus', 'hose', 'hair', 'chop', 'chops', 'house', 'choose'];
  const scores = sampleGuessWords.map((guessWord, rowIndex) =>
    getGuessWordScore(rowIndex, guessWord, sampleActualWord)
  );

  return (
    <section style={gridStyle}>
      <GameWord actualWord={sampleActualWord} />
      {sampleGuessWords.map((guessWord, rowIndex) => (
        <GuessWordRow rowIndex={rowIndex} guessWord={guessWord} />
      ))}
      <ScoreColumn actualWordLength={actualWordLength} scores={scores} />
      <span style={{ gridArea: GRID_AREA_NAMES.BONUS_SCORE_LABEL }}>Bonus Points:</span>
      <span style={{ gridArea: GRID_AREA_NAMES.FINAL_SCORE_LABEL }}>Final Score:</span>
    </section>
  );
};

YourWord.propTypes = propTypes;

export { YourWord };
