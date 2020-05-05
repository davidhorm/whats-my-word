import PropTypes from 'prop-types';
import React from 'react';
import { getGridTemplateAreas } from '../../services/grid-template.service';
import { ActionButton } from '../ActionButton';
import { GameWord } from '../GameWord';
import { GuessWordRow } from '../GuessWordRow';
import { ScoreColumn } from '../ScoreColumn';
import { initialState, reducer } from './reducer';

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
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const gridStyle = {
    display: 'grid',
    columnGap: '1rem',
    gridTemplateColumns: '1rem',
    gridTemplateAreas: getGridTemplateAreas(actualWordLength),
  };

  return (
    <section style={gridStyle}>
      <GameWord actualWord={state.actualWord} />
      {state.guessWords.map((guessWord, rowIndex) => (
        <GuessWordRow rowIndex={rowIndex} guessWord={guessWord} />
      ))}
      <ScoreColumn actualWordLength={actualWordLength} scores={state.guessWordScores} />
      <ActionButton action={state.currentStage} dispatch={dispatch} />
    </section>
  );
};

YourWord.propTypes = propTypes;

export { YourWord };
