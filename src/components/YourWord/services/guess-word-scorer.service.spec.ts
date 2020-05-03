import { getGuessWordScore } from './guess-word-scorer.service';

describe('guess-word-scorer.service', () => {
  describe('getGuessWordScore', () => {
    it('should score for NEPHEW', () => {
      const actualWord = 'nephew';
      const expectedScores = [
        { startIndex: 0, guessWord: 'so', score: 0 },
        { startIndex: 0, guessWord: 'den', score: 1250 },
        { startIndex: 1, guessWord: 'ebb', score: 1000 },
        { startIndex: 2, guessWord: 'inn', score: 250 },
        { startIndex: 3, guessWord: 'bid', score: 0 },
        { startIndex: 2, guessWord: 'turn', score: 250 },
        { startIndex: 1, guessWord: 'earl', score: 1000 },
        { startIndex: 0, guessWord: 'newt', score: 2250 },
        { startIndex: 0, guessWord: 'newel', score: 2500 },
        { startIndex: 1, guessWord: 'endow', score: 2250 },
        { startIndex: 0, guessWord: 'nephew', score: 6000 },
      ];

      expectedScores.forEach((expected) => {
        const actualScore = getGuessWordScore(expected.startIndex, expected.guessWord, actualWord);
        const actual = { ...expected, score: actualScore };
        expect(actual).toEqual(expected);
      });
    });

    it('should score for BALLET', () => {
      const actualWord = 'ballet';
      const expectedScores = [
        { startIndex: 0, guessWord: 'an', score: 250 },
        { startIndex: 0, guessWord: 'car', score: 1000 },
        { startIndex: 1, guessWord: 'act', score: 1250 },
        { startIndex: 2, guessWord: 'toe', score: 1250 },
        { startIndex: 3, guessWord: 'old', score: 250 },
        { startIndex: 2, guessWord: 'toot', score: 1000 },
        { startIndex: 1, guessWord: 'dull', score: 1250 },
        { startIndex: 0, guessWord: 'mail', score: 2000 },
        { startIndex: 0, guessWord: 'falls', score: 3000 },
        { startIndex: 1, guessWord: 'alter', score: 3250 },
        { startIndex: 0, guessWord: 'wallet', score: 5000 },
      ];

      /* eslint-disable-next-line sonarjs/no-identical-functions*/
      expectedScores.forEach((expected) => {
        const actualScore = getGuessWordScore(expected.startIndex, expected.guessWord, actualWord);
        const actual = { ...expected, score: actualScore };
        expect(actual).toEqual(expected);
      });
    });
  });
});
