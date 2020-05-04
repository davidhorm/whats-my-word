import { getGridTemplateAreas } from './grid-template.service';

describe('grid-template.service', () => {
  describe('getGridTemplateAreas', () => {
    describe('GIVEN the actual word length is 6 letters', () => {
      it('should return the grid template area grid for a 6-letter game.', () => {
        const actual = getGridTemplateAreas(6);

        const expectedRows = [
          '". actual-letter-0 actual-letter-1 actual-letter-2 actual-letter-3 actual-letter-4 actual-letter-5 . ."',
          '". row-0-letter-0 row-0-letter-1 . . . . row-0-score ."',
          '". row-1-letter-0 row-1-letter-1 row-1-letter-2 . . . row-1-score ."',
          '". . row-2-letter-0 row-2-letter-1 row-2-letter-2 . . row-2-score ."',
          '". . . row-3-letter-0 row-3-letter-1 row-3-letter-2 . row-3-score ."',
          '". . . . row-4-letter-0 row-4-letter-1 row-4-letter-2 row-4-score ."',
          '". . . row-5-letter-0 row-5-letter-1 row-5-letter-2 row-5-letter-3 row-5-score ."',
          '". . row-6-letter-0 row-6-letter-1 row-6-letter-2 row-6-letter-3 . row-6-score ."',
          '". row-7-letter-0 row-7-letter-1 row-7-letter-2 row-7-letter-3 . . row-7-score ."',
          '". row-8-letter-0 row-8-letter-1 row-8-letter-2 row-8-letter-3 row-8-letter-4 . row-8-score ."',
          '". . row-9-letter-0 row-9-letter-1 row-9-letter-2 row-9-letter-3 row-9-letter-4 row-9-score ."',
          '". row-10-letter-0 row-10-letter-1 row-10-letter-2 row-10-letter-3 row-10-letter-4 row-10-letter-5 row-10-score ."',
          '". bonus-score-label bonus-score-label bonus-score-label bonus-score-label bonus-score-label bonus-score-label bonus-score ."',
          '". final-score-label final-score-label final-score-label final-score-label final-score-label final-score-label final-score ."',
        ];
        const expected = expectedRows.join(' ');
        expect(actual).toBe(expected);
      });
    });
  });
});
