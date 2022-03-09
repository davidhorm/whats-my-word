import type { GameRoundNumber, GuessWordScore, ValidGuessWord } from '.';
import type { GameWordLength, ValidGameWord } from '../game-word-service';
import { ParseGuessLetters } from './guess-word-service';

enum EMOJI {
  EMPTY = '⬛',
  MATCHING = '🟩',
  NON_MATCHING = '🟨',
  NON_EXISTING = '⬜',
  UNKNOWN = '❓',
}

const transformToActualAndGuessLetters = (gameWord: ValidGameWord) => (guessLetter: string, index: number) => {
  const actualLetters = gameWord.split('');
  return {
    guessLetter,
    actualLetter: actualLetters[index],
    emoji: !guessLetter ? EMOJI.EMPTY : EMOJI.UNKNOWN,
  };
};

const scoreMatchingLetters = (item: ReturnType<ReturnType<typeof transformToActualAndGuessLetters>>) => {
  if (item.guessLetter && item.guessLetter === item.actualLetter) {
    return {
      actualLetter: '',
      guessLetter: '',
      emoji: EMOJI.MATCHING,
    };
  }

  return item;
};

type RemainingLetters = {
  remainingActualLetters: string[];
  guessLetters: Omit<ReturnType<typeof scoreMatchingLetters>, 'actualLetter'>[];
};

const initialRemainingLetters: RemainingLetters = {
  remainingActualLetters: [],
  guessLetters: [],
};

/** Transform to be used by `scoreRemainingLetters` */
const transformToRemainingLetters = (
  previous: RemainingLetters,
  { actualLetter, ...guessLetter }: ReturnType<typeof scoreMatchingLetters>,
) => ({
  remainingActualLetters: !!actualLetter
    ? [...previous.remainingActualLetters, actualLetter]
    : previous.remainingActualLetters,
  guessLetters: [...previous.guessLetters, guessLetter],
});

/**
 * Score each remaining guess letters, and see if they exist in the remaining actual letters.
 *
 * @returns Any updates to remaining letters, and updated counts/scores.
 */
const scoreRemainingLetters = ({
  remainingActualLetters,
  guessLetters,
}: ReturnType<typeof transformToRemainingLetters>) => {
  const scoredLetters = guessLetters.map((item) => {
    if (!item.guessLetter) return item;

    const foundLetterIndex = remainingActualLetters.indexOf(item.guessLetter);
    if (foundLetterIndex === -1) return { ...item, emoji: EMOJI.NON_EXISTING };

    remainingActualLetters.splice(foundLetterIndex, 1);
    return { ...item, emoji: EMOJI.NON_MATCHING };
  });

  const emojiResult = scoredLetters.map(({ emoji }) => emoji).join('');
  const matchingLetters = scoredLetters.filter(({ emoji }) => emoji === EMOJI.MATCHING).length;
  const nonMatchingLetters = scoredLetters.filter(({ emoji }) => emoji === EMOJI.NON_MATCHING).length;
  const score = matchingLetters * 1000 + nonMatchingLetters * 250;

  return { matchingLetters, nonMatchingLetters, score, emojiResult };
};

/** Get the score of the Guess Word.  */
export const CalculateGuessResult = (
  gameWord: ValidGameWord,
  guessWord: ValidGuessWord,
  roundNumber: GameRoundNumber,
): GuessWordScore => {
  const remainingLetters = ParseGuessLetters(gameWord.length as GameWordLength, guessWord, roundNumber)
    .map(transformToActualAndGuessLetters(gameWord))
    .map(scoreMatchingLetters)
    .reduce(transformToRemainingLetters, initialRemainingLetters);

  const { matchingLetters, nonMatchingLetters, score, emojiResult } = scoreRemainingLetters(remainingLetters);

  return { matchingLetters, nonMatchingLetters, score, emojiResult };
};
