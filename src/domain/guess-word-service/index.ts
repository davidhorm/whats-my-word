/** *******************
 * DOMAIN/PUBLIC TYPES
 * ********************/

// /** Word is not valid length for a given length. */
// type InvalidWordLengthError = Error;

// /** Word is not defined */
// type InvalidWordError = Error;

// type InvalidGuessWordError = InvalidWordLengthError | InvalidWordError;

export type GuessWordScore = {
  matchingLetters: number;
  nonMatchingLetters: number;
  score: number;
  emojiResult: string;
};

/** **************
 * INTERNAL TYPES
 * ***************/
export type GameRoundNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ValidGuessWord = string;

// type ValidateGuessWord = (word: string, state: GameState) => InvalidGuessWordError | ValidGuessWord;

export { CalculateGuessResult } from './guess-result-service';
export { GetValidationRule, ParseGuessLetters } from './guess-word-service';
