import { GetValidationRule, ParseGuessLetters } from './guess-word-service';

describe('guess-word-service', () => {
  describe(ParseGuessLetters.name, () => {
    describe(`GIVEN 6-letter game word`, () => {
      it.each`
        guessWord   | round | expectedArray
        ${'ab'}     | ${0}  | ${['a', 'b', '', '', '', '']}
        ${'abc'}    | ${1}  | ${['a', 'b', 'c', '', '', '']}
        ${'abc'}    | ${2}  | ${['', 'a', 'b', 'c', '', '']}
        ${'abc'}    | ${3}  | ${['', '', 'a', 'b', 'c', '']}
        ${'abc'}    | ${4}  | ${['', '', '', 'a', 'b', 'c']}
        ${'abcd'}   | ${5}  | ${['', '', 'a', 'b', 'c', 'd']}
        ${'abcd'}   | ${6}  | ${['', 'a', 'b', 'c', 'd', '']}
        ${'abcd'}   | ${7}  | ${['a', 'b', 'c', 'd', '', '']}
        ${'abcde'}  | ${8}  | ${['a', 'b', 'c', 'd', 'e', '']}
        ${'abcde'}  | ${9}  | ${['', 'a', 'b', 'c', 'd', 'e']}
        ${'abcdef'} | ${10} | ${['a', 'b', 'c', 'd', 'e', 'f']}
      `(
        `WHEN { guessWord: '$guessWord', roundNumber: $round }, THEN $expectedArray`,
        ({ guessWord, round, expectedArray }) => {
          const actualArray = ParseGuessLetters(6, guessWord, round);
          expect(actualArray).toEqual(expectedArray);
        }
      );
    });

    describe(`GIVEN 7-letter game word`, () => {
      it.each`
        guessWord    | round | expectedArray
        ${'abc'}     | ${0}  | ${['a', 'b', 'c', '', '', '', '']}
        ${'abcd'}    | ${1}  | ${['a', 'b', 'c', 'd', '', '', '']}
        ${'abcd'}    | ${2}  | ${['', 'a', 'b', 'c', 'd', '', '']}
        ${'abcd'}    | ${3}  | ${['', '', 'a', 'b', 'c', 'd', '']}
        ${'abcd'}    | ${4}  | ${['', '', '', 'a', 'b', 'c', 'd']}
        ${'abcde'}   | ${5}  | ${['', '', 'a', 'b', 'c', 'd', 'e']}
        ${'abcde'}   | ${6}  | ${['', 'a', 'b', 'c', 'd', 'e', '']}
        ${'abcde'}   | ${7}  | ${['a', 'b', 'c', 'd', 'e', '', '']}
        ${'abcdef'}  | ${8}  | ${['a', 'b', 'c', 'd', 'e', 'f', '']}
        ${'abcdef'}  | ${9}  | ${['', 'a', 'b', 'c', 'd', 'e', 'f']}
        ${'abcdefg'} | ${10} | ${['a', 'b', 'c', 'd', 'e', 'f', 'g']}
      `(
        `WHEN { guessWord: '$guessWord', roundNumber: $round }, THEN $expectedArray`,
        ({ guessWord, round, expectedArray }) => {
          const actualArray = ParseGuessLetters(7, guessWord, round);
          expect(actualArray).toEqual(expectedArray);
        }
      );
    });
  });

  describe(GetValidationRule.name, () => {
    it.each`
      gameWordLength | round | expectedGuessWordLength
      ${6}           | ${0}  | ${2}
      ${6}           | ${1}  | ${3}
      ${6}           | ${2}  | ${3}
      ${6}           | ${3}  | ${3}
      ${6}           | ${4}  | ${3}
      ${6}           | ${5}  | ${4}
      ${6}           | ${6}  | ${4}
      ${6}           | ${7}  | ${4}
      ${6}           | ${8}  | ${5}
      ${6}           | ${9}  | ${5}
      ${6}           | ${10} | ${6}
      ${7}           | ${0}  | ${3}
      ${7}           | ${1}  | ${4}
      ${7}           | ${2}  | ${4}
      ${7}           | ${3}  | ${4}
      ${7}           | ${4}  | ${4}
      ${7}           | ${5}  | ${5}
      ${7}           | ${6}  | ${5}
      ${7}           | ${7}  | ${5}
      ${7}           | ${8}  | ${6}
      ${7}           | ${9}  | ${6}
      ${7}           | ${10} | ${7}
    `(
      'GIVEN gameWordLength=$gameWordLength, roundNumber=$round, THEN maxLength=$expectedGuessWordLength',
      ({ gameWordLength, round, expectedGuessWordLength }) => {
        const rule = GetValidationRule(gameWordLength, round);
        expect(rule.maxLength).toBe(expectedGuessWordLength);
      }
    );
  });
});
