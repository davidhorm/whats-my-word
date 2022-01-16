/** The length of the word to guess */
export type GameWordLength = 6 | 7;

/** The validated word to guess */
export type ValidGameWord = string;

/** Code representing the Game Word to guess. The Code is the index of the word in a dictionary array. */
export type GameWordCode = string;

export {
  GenerateGameWordCode,
  GenerateRandomGameWordCode,
  GetGameWordCodeValidationRule,
  TransformToGameWord,
} from './game-word-code-service';
export { GetGameWordValidationRule } from './game-word-validation-service';
