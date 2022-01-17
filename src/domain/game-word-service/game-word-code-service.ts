import type { GameWordCode, GameWordLength, ValidGameWord } from '.';
import sixLetterWords from '../../wordList/6-letter-words.json';
import sevenLetterWords from '../../wordList/7-letter-words.json';

const RADIX = 26;
const MAX_SIX_LETTER_CODE_NUMBER = parseInt('ppp', RADIX);
const MAX_SEVEN_LETTER_CODE_NUMBER = parseInt('pppp', RADIX);

const shiftCode = (code: string, direction: 'UP' | 'DOWN') => {
  const downChars = '0123456789ABCDEFGHIJKLMNOP'; // Used for parseInt-26 radix format
  const upChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Used as ALPHA-only game code.

  const shiftCharMap: Record<typeof direction, (c: string) => string> = {
    UP: (char: string) => upChars.charAt(downChars.indexOf(char)),
    DOWN: (char: string) => downChars.charAt(upChars.indexOf(char)),
  };

  return code.split('').map(shiftCharMap[direction]).join('');
};

const convertNumberToCode = (number: number, length: GameWordLength): GameWordCode => {
  const codeLength = length === 6 ? 3 : 4;
  const code = number.toString(RADIX).toUpperCase().padStart(codeLength, '0');
  return shiftCode(code, 'UP');
};

const convertCodeToNumber = (code: string) => {
  const shiftCodeDown = shiftCode(code, 'DOWN');
  return parseInt(shiftCodeDown, RADIX);
};

/** User selects a game word for opponent to guess. If valid, then generate the code. Provide the code to the opponent to start their game. */
export const GenerateGameWordCode = (word: string): GameWordCode => {
  const listMap = {
    6: { wordList: sixLetterWords, multiplier: MAX_SIX_LETTER_CODE_NUMBER },
    7: { wordList: sevenLetterWords, multiplier: MAX_SEVEN_LETTER_CODE_NUMBER },
  };

  const wordLength = word.length as GameWordLength;
  const { wordList, multiplier } = listMap[wordLength] || {};
  if (!wordList) return ''; // TODO: handle error better

  const wordIndex = wordList.indexOf(word.toLowerCase());
  if (wordIndex === -1) return ''; // TODO: handle error better

  const percentage = wordIndex / (wordList.length - 1);
  const codeNumber = Math.round(percentage * multiplier);
  return convertNumberToCode(codeNumber, wordLength);
};

export const TransformToGameWord = (code: GameWordCode): ValidGameWord => {
  const numerator = convertCodeToNumber(code);
  const listMap = {
    3: {
      wordList: sixLetterWords,
      denominator: MAX_SIX_LETTER_CODE_NUMBER,
    },
    4: {
      wordList: sevenLetterWords,
      denominator: MAX_SEVEN_LETTER_CODE_NUMBER,
    },
  };

  const { wordList, denominator } = listMap[code.length as 3 | 4];

  const percentage = numerator / denominator;
  const wordIndex = Math.round(percentage * (wordList.length - 1));

  return wordList[wordIndex];
};

/** AI selects a game word for any player to guess. The code provided is used to start the game. */
export const GenerateRandomGameWordCode = (length: GameWordLength): GameWordCode => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Used as ALPHA-only game code.
  const codeLength = length === 6 ? 3 : 4;

  return Array.from({ length: codeLength }, () => chars.charAt(Math.random() * chars.length - 1)).join('');
};

/** Form Validation rule for UI */
type GameWordCodeFormValidationRule = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name' | 'required' | 'minLength' | 'maxLength' | 'pattern'
>;

export const GetGameWordCodeValidationRule: GameWordCodeFormValidationRule = {
  name: 'gameWord',
  required: true,
  minLength: 3,
  maxLength: 4,
  pattern: '^[A-Z]{3,4}$',
};

export const FOR_TESTING = {
  convertCodeToNumber,
  convertNumberToCode,
};
