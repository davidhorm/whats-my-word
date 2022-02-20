import type { GameRoundNumber, GuessWordScore, ValidGuessWord } from '.';
import type { GameWordLength, ValidGameWord } from '../game-word-service';
import { ParseGuessLetters } from './guess-word-service';

const transformToActualAndGuessLetters = (gameWord: ValidGameWord) => (guessLetter: string, index: number) => {
  const actualLetters = gameWord.split('');
  return {
    guessLetter,
    actualLetter: actualLetters[index],
  };
};

const scoreMatchingLetters = (item: ReturnType<ReturnType<typeof transformToActualAndGuessLetters>>) => {
  if (item.guessLetter && item.guessLetter === item.actualLetter) {
    return {
      actualLetter: '',
      guessLetter: '',
      matchingLetters: 1,
      score: 1000,
    };
  }

  return { ...item, matchingLetters: 0, score: 0 };
};

type RemainingLetters = GuessWordScore & { remainingActualLetters: string; remainingGuessLetters: string[] };

const initialRemainingLetters: RemainingLetters = {
  remainingActualLetters: '',
  remainingGuessLetters: [],
  matchingLetters: 0,
  nonMatchingLetters: 0,
  score: 0,
};

/** Transform to be used by `scoreRemainingLetters` */
const transformToRemainingLetters = (previous: RemainingLetters, current: ReturnType<typeof scoreMatchingLetters>) => ({
  remainingActualLetters: previous.remainingActualLetters + current.actualLetter,
  remainingGuessLetters: current.guessLetter
    ? previous.remainingGuessLetters.concat(current.guessLetter)
    : previous.remainingGuessLetters,
  matchingLetters: previous.matchingLetters + current.matchingLetters,
  nonMatchingLetters: 0,
  score: previous.score + current.score,
});

/**
 * Recursive method to take each remaining guess letters, and see if they exist in the remaining actual letters.
 *
 * @returns Any updates to remaining letters, and updated counts/scores.
 */
const scoreRemainingLetters = ({
  remainingActualLetters,
  remainingGuessLetters,
  matchingLetters,
  nonMatchingLetters,
  score,
}: RemainingLetters): RemainingLetters => {
  const guessLetter = remainingGuessLetters.shift();

  if (!guessLetter)
    return { remainingActualLetters, remainingGuessLetters, matchingLetters, nonMatchingLetters, score };

  if (remainingActualLetters.includes(guessLetter)) {
    return scoreRemainingLetters({
      remainingActualLetters: remainingActualLetters.replace(guessLetter, ''),
      remainingGuessLetters,
      matchingLetters,
      nonMatchingLetters: nonMatchingLetters + 1,
      score: score + 250,
    });
  }

  return scoreRemainingLetters({
    remainingActualLetters,
    remainingGuessLetters,
    matchingLetters,
    nonMatchingLetters,
    score,
  });
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

  const { matchingLetters, nonMatchingLetters, score } = scoreRemainingLetters(remainingLetters);

  return { matchingLetters, nonMatchingLetters, score };
};
