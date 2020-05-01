import { getLetterGridTemplateAreas } from './grid-template.service';

describe('grid-template.service', () => {
  describe('getLetterGridTemplateAreas', () => {
    describe('GIVEN the actual word length is 6 letters', () => {
      it('should return the grid template area grid for a 6-letter game.', () => {
        const actual = getLetterGridTemplateAreas(6);

        const expectedRows = [
          '". r0l0 r0l1 . . . . ."',
          '". r1l0 r1l1 r1l2 . . . ."',
          '". . r2l0 r2l1 r2l2 . . ."',
          '". . . r3l0 r3l1 r3l2 . ."',
          '". . . . r4l0 r4l1 r4l2 ."',
          '". . . r5l0 r5l1 r5l2 r5l3 ."',
          '". . r6l0 r6l1 r6l2 r6l3 . ."',
          '". r7l0 r7l1 r7l2 r7l3 . . ."',
          '". r8l0 r8l1 r8l2 r8l3 r8l4 . ."',
          '". . r9l0 r9l1 r9l2 r9l3 r9l4 ."',
          '". r10l0 r10l1 r10l2 r10l3 r10l4 r10l5 ."',
        ];
        const expected = expectedRows.join(' ');
        expect(actual).toBe(expected);
      });
    });
  });
});
