import { getGuessWordScore } from './guess-word-scorer.service';

describe('guess-word-scorer.service', () => {
  describe('getGuessWordScore', () => {
    it('should score for NEPHEW', () => {
      const actualWord = 'nephew';
      const expectedScores = [
        { guessWord: 'so', score: 0 },
        { guessWord: 'den', score: 1250 },
        { guessWord: 'ebb', score: 1000 },
        { guessWord: 'inn', score: 250 },
        { guessWord: 'bid', score: 0 },
        { guessWord: 'turn', score: 250 },
        { guessWord: 'earl', score: 1000 },
        { guessWord: 'newt', score: 2250 },
        { guessWord: 'newel', score: 2500 },
        { guessWord: 'endow', score: 2250 },
        { guessWord: 'nephew', score: 6000 },
      ];

      expectedScores.forEach((expected, rowIndex) => {
        const actualScore = getGuessWordScore(rowIndex, expected.guessWord, actualWord);
        const actual = { ...expected, score: actualScore };
        expect(actual).toEqual(expected);
      });
    });

    it('should score for BALLET', () => {
      const actualWord = 'ballet';
      const expectedScores = [
        { guessWord: 'an', score: 250 },
        { guessWord: 'car', score: 1000 },
        { guessWord: 'act', score: 1250 },
        { guessWord: 'toe', score: 1250 },
        { guessWord: 'old', score: 250 },
        { guessWord: 'toot', score: 1000 },
        { guessWord: 'dull', score: 1250 },
        { guessWord: 'mail', score: 2000 },
        { guessWord: 'falls', score: 3000 },
        { guessWord: 'alter', score: 3250 },
        { guessWord: 'wallet', score: 5000 },
      ];

      /* eslint-disable-next-line sonarjs/no-identical-functions*/
      expectedScores.forEach((expected, rowIndex) => {
        const actualScore = getGuessWordScore(rowIndex, expected.guessWord, actualWord);
        const actual = { ...expected, score: actualScore };
        expect(actual).toEqual(expected);
      });
    });
  });
});
