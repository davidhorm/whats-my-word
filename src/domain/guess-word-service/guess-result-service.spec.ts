import { CalculateGuessResult } from './guess-result-service';

describe(CalculateGuessResult.name, () => {
  describe(`GIVEN { gameWord: 'nephew' }`, () => {
    const gameWord = 'nephew';

    it.each`
      guessWord   | round | expectedScore
      ${'so'}     | ${0}  | ${{ emojiResult: '⬜⬜⬛⬛⬛⬛', matchingLetters: 0, nonMatchingLetters: 0, score: 0 }}
      ${'den'}    | ${1}  | ${{ emojiResult: '⬜🟩🟨⬛⬛⬛', matchingLetters: 1, nonMatchingLetters: 1, score: 1250 }}
      ${'ebb'}    | ${2}  | ${{ emojiResult: '⬛🟩⬜⬜⬛⬛', matchingLetters: 1, nonMatchingLetters: 0, score: 1000 }}
      ${'inn'}    | ${3}  | ${{ emojiResult: '⬛⬛⬜🟨⬜⬛', matchingLetters: 0, nonMatchingLetters: 1, score: 250 }}
      ${'bid'}    | ${4}  | ${{ emojiResult: '⬛⬛⬛⬜⬜⬜', matchingLetters: 0, nonMatchingLetters: 0, score: 0 }}
      ${'turn'}   | ${5}  | ${{ emojiResult: '⬛⬛⬜⬜⬜🟨', matchingLetters: 0, nonMatchingLetters: 1, score: 250 }}
      ${'earl'}   | ${6}  | ${{ emojiResult: '⬛🟩⬜⬜⬜⬛', matchingLetters: 1, nonMatchingLetters: 0, score: 1000 }}
      ${'newt'}   | ${7}  | ${{ emojiResult: '🟩🟩🟨⬜⬛⬛', matchingLetters: 2, nonMatchingLetters: 1, score: 2250 }}
      ${'newel'}  | ${8}  | ${{ emojiResult: '🟩🟩🟨🟨⬜⬛', matchingLetters: 2, nonMatchingLetters: 2, score: 2500 }}
      ${'endow'}  | ${9}  | ${{ emojiResult: '⬛🟩🟨⬜⬜🟩', matchingLetters: 2, nonMatchingLetters: 1, score: 2250 }}
      ${'nephew'} | ${10} | ${{ emojiResult: '🟩🟩🟩🟩🟩🟩', matchingLetters: 6, nonMatchingLetters: 0, score: 6000 }}
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
      ${'an'}     | ${0}  | ${{ emojiResult: '🟨⬜⬛⬛⬛⬛', matchingLetters: 0, nonMatchingLetters: 1, score: 250 }}
      ${'car'}    | ${1}  | ${{ emojiResult: '⬜🟩⬜⬛⬛⬛', matchingLetters: 1, nonMatchingLetters: 0, score: 1000 }}
      ${'act'}    | ${2}  | ${{ emojiResult: '⬛🟩⬜🟨⬛⬛', matchingLetters: 1, nonMatchingLetters: 1, score: 1250 }}
      ${'toe'}    | ${3}  | ${{ emojiResult: '⬛⬛🟨⬜🟩⬛', matchingLetters: 1, nonMatchingLetters: 1, score: 1250 }}
      ${'old'}    | ${4}  | ${{ emojiResult: '⬛⬛⬛⬜🟨⬜', matchingLetters: 0, nonMatchingLetters: 1, score: 250 }}
      ${'toot'}   | ${5}  | ${{ emojiResult: '⬛⬛⬜⬜⬜🟩', matchingLetters: 1, nonMatchingLetters: 0, score: 1000 }}
      ${'dull'}   | ${6}  | ${{ emojiResult: '⬛⬜⬜🟩🟨⬛', matchingLetters: 1, nonMatchingLetters: 1, score: 1250 }}
      ${'mail'}   | ${7}  | ${{ emojiResult: '⬜🟩⬜🟩⬛⬛', matchingLetters: 2, nonMatchingLetters: 0, score: 2000 }}
      ${'falls'}  | ${8}  | ${{ emojiResult: '⬜🟩🟩🟩⬜⬛', matchingLetters: 3, nonMatchingLetters: 0, score: 3000 }}
      ${'alter'}  | ${9}  | ${{ emojiResult: '⬛🟩🟩🟨🟩⬜', matchingLetters: 3, nonMatchingLetters: 1, score: 3250 }}
      ${'wallet'} | ${10} | ${{ emojiResult: '⬜🟩🟩🟩🟩🟩', matchingLetters: 5, nonMatchingLetters: 0, score: 5000 }}
    `(
      `WHEN { guessWord: '$guessWord', roundNumber: $round }, THEN { score: $expectedScore }`,
      ({ guessWord, round, expectedScore }) => {
        const actualScore = CalculateGuessResult(gameWord, guessWord, round);
        expect(actualScore).toEqual(expectedScore);
      },
    );
  });
});
