import { CalculateGuessResult } from './guess-result-service';

describe(CalculateGuessResult.name, () => {
  describe(`GIVEN { gameWord: 'nephew' }`, () => {
    const gameWord = 'nephew';

    it.each`
      guessWord   | round | expectedScore
      ${'so'}     | ${0}  | ${{ matchingLetters: 0, nonMatchingLetters: 0, score: 0 }}
      ${'den'}    | ${1}  | ${{ matchingLetters: 1, nonMatchingLetters: 1, score: 1250 }}
      ${'ebb'}    | ${2}  | ${{ matchingLetters: 1, nonMatchingLetters: 0, score: 1000 }}
      ${'inn'}    | ${3}  | ${{ matchingLetters: 0, nonMatchingLetters: 1, score: 250 }}
      ${'bid'}    | ${4}  | ${{ matchingLetters: 0, nonMatchingLetters: 0, score: 0 }}
      ${'turn'}   | ${5}  | ${{ matchingLetters: 0, nonMatchingLetters: 1, score: 250 }}
      ${'earl'}   | ${6}  | ${{ matchingLetters: 1, nonMatchingLetters: 0, score: 1000 }}
      ${'newt'}   | ${7}  | ${{ matchingLetters: 2, nonMatchingLetters: 1, score: 2250 }}
      ${'newel'}  | ${8}  | ${{ matchingLetters: 2, nonMatchingLetters: 2, score: 2500 }}
      ${'endow'}  | ${9}  | ${{ matchingLetters: 2, nonMatchingLetters: 1, score: 2250 }}
      ${'nephew'} | ${10} | ${{ matchingLetters: 6, nonMatchingLetters: 0, score: 6000 }}
    `(
      `WHEN { guessWord: '$guessWord', roundNumber: $round }, THEN { score: $expectedScore }`,
      ({ guessWord, round, expectedScore }) => {
        const actualScore = CalculateGuessResult(gameWord, guessWord, round);
        expect(actualScore).toEqual(expectedScore);
      },
    );
  });

  describe(`GIVEN { gameWord: 'ballet' }`, () => {
    const gameWord = 'ballet';

    it.each`
      guessWord   | round | expectedScore
      ${'an'}     | ${0}  | ${{ matchingLetters: 0, nonMatchingLetters: 1, score: 250 }}
      ${'car'}    | ${1}  | ${{ matchingLetters: 1, nonMatchingLetters: 0, score: 1000 }}
      ${'act'}    | ${2}  | ${{ matchingLetters: 1, nonMatchingLetters: 1, score: 1250 }}
      ${'toe'}    | ${3}  | ${{ matchingLetters: 1, nonMatchingLetters: 1, score: 1250 }}
      ${'old'}    | ${4}  | ${{ matchingLetters: 0, nonMatchingLetters: 1, score: 250 }}
      ${'toot'}   | ${5}  | ${{ matchingLetters: 1, nonMatchingLetters: 0, score: 1000 }}
      ${'dull'}   | ${6}  | ${{ matchingLetters: 1, nonMatchingLetters: 1, score: 1250 }}
      ${'mail'}   | ${7}  | ${{ matchingLetters: 2, nonMatchingLetters: 0, score: 2000 }}
      ${'falls'}  | ${8}  | ${{ matchingLetters: 3, nonMatchingLetters: 0, score: 3000 }}
      ${'alter'}  | ${9}  | ${{ matchingLetters: 3, nonMatchingLetters: 1, score: 3250 }}
      ${'wallet'} | ${10} | ${{ matchingLetters: 5, nonMatchingLetters: 0, score: 5000 }}
    `(
      `WHEN { guessWord: '$guessWord', roundNumber: $round }, THEN { score: $expectedScore }`,
      ({ guessWord, round, expectedScore }) => {
        const actualScore = CalculateGuessResult(gameWord, guessWord, round);
        expect(actualScore).toEqual(expectedScore);
      },
    );
  });
});
