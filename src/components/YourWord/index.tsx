import PropTypes from 'prop-types';
import React from 'react';
import { getGridTemplateAreas, GUESS_WORD_LENGTHS } from '../../services/grid-template.service';
import { ActionButton } from '../ActionButton';
import { GameWord } from '../GameWord';
import { GuessWordRow } from '../GuessWordRow';
import { ScoreColumn } from '../ScoreColumn';
import { getStageIndex, initialState, reducer } from './reducer';

const NUMBER_OF_GUESSES = new Array(11).fill(null);

/**
 * Get the <GuessWordRow /> component.
 *
 * @param {number} actualWordLength - The max length of the Actual Word.
 * @param {string[]} guessWords - List of guess words.
 * @returns {object} - <GuessWordRow />
 */
const getGuessWordRow = (actualWordLength: number, guessWords: string[]) => (_: any, rowIndex: number) => {
  const guessWord = guessWords[rowIndex];
  return (
    <GuessWordRow
      rowIndex={rowIndex}
      guessWord={guessWord}
      guessWordLength={actualWordLength + GUESS_WORD_LENGTHS[rowIndex]}
    />
  );
};

/**
 * Get the `textFieldType` prop for <ActionButton />.
 *
 * @param {number} actualWordLength - The max length of the Actual Word.
 * @param {string} currentStage - The current game stage for the <ActionButton />
 * @returns {object} - {type, maxLength}
 */
const getTextFieldType = (actualWordLength: number, currentStage: string) => {
  const stageIndex = getStageIndex(currentStage);
  const maxLength = stageIndex === 0 ? actualWordLength : actualWordLength + GUESS_WORD_LENGTHS[stageIndex - 1];
  return { type: 'text', maxLength };
};

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

  const actionButtonProps = {
    action: state.currentStage,
    dispatch,
    textFieldType: getTextFieldType(actualWordLength, state.currentStage),
  };

  return (
    <section style={gridStyle}>
      <GameWord actualWord={state.actualWord} />
      {NUMBER_OF_GUESSES.map(getGuessWordRow(actualWordLength, state.guessWords))}
      <ScoreColumn actualWordLength={actualWordLength} scores={state.guessWordScores} />
      <ActionButton {...actionButtonProps} />
    </section>
  );
};

YourWord.propTypes = propTypes;

export { YourWord };
