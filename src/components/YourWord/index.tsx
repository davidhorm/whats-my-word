import PropTypes from 'prop-types';
import React from 'react';
import '../../index.css';
import { GUESS_WORD_LENGTHS } from '../../services/grid-template.service';
import { ActionButton } from '../ActionButton';
import { FinalScoreRows } from '../FinalScoreRows';
import { GameWord } from '../GameWord';
import { GuessWordRow } from '../GuessWordRow';
import { getStageIndex, initialState, reducer } from './reducer';

const NUMBER_OF_GUESSES = new Array(11).fill(null);

/**
 * Get the <GuessWordRow /> component.
 *
 * @param {number} actualWordLength - The max length of the Actual Word.
 * @param {string[]} guessWords - List of guess words.
 * @param {number[]} guessWordScores - List of scores for the guess word.
 * @returns {object} - <GuessWordRow />
 */
const getGuessWordRow = (actualWordLength: number, guessWords: string[], guessWordScores: number[]) => (
  _: any,
  rowIndex: number
) => (
  <GuessWordRow
    /* eslint-disable-next-line react/no-array-index-key*/
    key={`word-${rowIndex}-${guessWords[rowIndex]}`}
    rowIndex={rowIndex}
    actualWordLength={actualWordLength}
    guessWord={guessWords[rowIndex]}
    guessWordScore={guessWordScores[rowIndex]}
  />
);

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

  return (
    <>
      <table className="gameTable">
        <tbody>
          <GameWord actualWord={state.actualWord} />
          {NUMBER_OF_GUESSES.map(getGuessWordRow(actualWordLength, state.guessWords, state.guessWordScores))}
          <FinalScoreRows actualWordLength={actualWordLength} scores={state.guessWordScores} />
        </tbody>
      </table>
      <ActionButton
        action={state.currentStage}
        dispatch={dispatch}
        textFieldType={getTextFieldType(actualWordLength, state.currentStage)}
      />
    </>
  );
};

YourWord.propTypes = propTypes;

export { YourWord };
