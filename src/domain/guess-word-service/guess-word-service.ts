import type { GameRoundNumber, ValidGuessWord } from '.';
import type { GameWordLength } from '../game-word-service';

/**
 * Parse the Guess Word into an array of letters. The Round Number determines the left padding. The
 * remaining space of the Game Word determines the right padding.
 */
export const ParseGuessLetters = (
  gameWordLength: GameWordLength,
  guessWord: ValidGuessWord,
  roundNumber: GameRoundNumber,
): string[] => {
  const guessWordStartIndex = [0, 0, 1, 2, 3, 2, 1, 0, 0, 1, 0];
  const leftPadCount = guessWordStartIndex[roundNumber];
  const rightPadCount = gameWordLength - guessWord.length - leftPadCount;
  return [...new Array(leftPadCount).fill(''), ...guessWord.split(''), ...new Array(rightPadCount).fill('')];
};

/** Form Validation rule for UI */
type GuessWordFormValidationRule = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name' | 'required' | 'maxLength' | 'pattern'
>;

export const GetValidationRule = (
  gameWordLength: GameWordLength,
  roundNumber: GameRoundNumber,
): GuessWordFormValidationRule => {
  /**
   * The guess word lengths. Add with the actual word length to get the value.
   * The position in the array represents the row index.
   */
  const guessWordLengths = [-4, -3, -3, -3, -3, -2, -2, -2, -1, -1, 0];
  const maxLength = gameWordLength + guessWordLengths[roundNumber];
  return {
    name: 'guessWord',
    required: true,
    maxLength,
    pattern: `[A-Z]{${maxLength}}`,
  };
};
