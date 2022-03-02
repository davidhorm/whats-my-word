import sixLetterWords from '../../wordList/6-letter-words.json';
import sevenLetterWords from '../../wordList/7-letter-words.json';
import {
  FOR_TESTING,
  GenerateGameWordCode,
  GenerateRandomGameWordCode,
  GetGameWordCodeValidationRule,
  TransformToGameWord,
} from './game-word-code-service';

describe('game-word-code-service', () => {
  describe(TransformToGameWord.name, () => {
    it.each`
      code
      ${'AB' /* too short */}
      ${'ABCDE' /* too long */}
      ${'0BC' /* has numbers */}
      ${'0BCD' /* has numbers */}
    `('WHEN invalid code=$code, THEN returns empty string', ({ code }) => {
      const actualCode = TransformToGameWord(code);
      expect(actualCode).toBe('');
    });
  });

  describe.each`
    gameWord     | wordCode
    ${'abacas'}  | ${'AAA'}
    ${'ballet'}  | ${'BKS'}
    ${'nephew'}  | ${'OWS'}
    ${'zyrian'}  | ${'ZZZ'}
    ${'aadhaar'} | ${'AAAA'}
    ${'zymurgy'} | ${'ZZZZ'}
  `('sample GameWordCode to word Conversion', ({ gameWord, wordCode }) => {
    it(`${GenerateGameWordCode.name} > WHEN gameWord=${gameWord}, THEN code=${wordCode}`, () => {
      const actualWordCode = GenerateGameWordCode(gameWord);
      expect(actualWordCode).toBe(wordCode);
    });

    it(`${TransformToGameWord.name} > WHEN wordCode=${wordCode}, THEN gameWord=${gameWord}`, () => {
      const actualGameWord = TransformToGameWord(wordCode);
      expect(actualGameWord).toBe(gameWord);
    });
  });

  describe(`Word => ${GenerateGameWordCode.name} => ${TransformToGameWord.name} => Word`, () => {
    it.each`
      wordLength | wordList
      ${6}       | ${sixLetterWords}
      ${7}       | ${sevenLetterWords}
    `('All $wordLength-letter words', ({ wordList }) => {
      wordList.forEach((originalWord: string) => {
        const code = GenerateGameWordCode(originalWord);
        const expectedWord = TransformToGameWord(code);
        expect(originalWord).toBe(expectedWord);
      });
    });
  });

  describe(GenerateGameWordCode.name, () => {
    it.each`
      gameWord
      ${'tulip' /** too short */}
      ${'abcdef' /** not a word */}
      ${'abcdefg' /** not a word */}
      ${'fartings' /** too long */}
    `('WHEN invalid gameWord=$gameWord, THEN empty code', ({ gameWord }) => {
      const actualWordCode = GenerateGameWordCode(gameWord);
      expect(actualWordCode).toBe('');
    });
  });

  describe(GenerateRandomGameWordCode.name, () => {
    it.each`
      wordLength | pattern
      ${6}       | ${new RegExp(`^[A-Z]{3}$`)}
      ${7}       | ${new RegExp(`^[A-Z]{4}$`)}
    `('WHEN wordLength=$wordLength, then pattern=$pattern', ({ wordLength, pattern }) => {
      const code = GenerateRandomGameWordCode(wordLength);
      expect(pattern.test(code)).toBeTruthy();
    });
  });

  describe('GetGameWordCodeValidationRule', () => {
    it.each`
      gameWordCode
      ${'ABC'}
      ${'ABCD'}
    `('WHEN gameWord=$gameWordCode THEN valid', ({ gameWordCode }) => {
      expect(new RegExp(GetGameWordCodeValidationRule.pattern || '').test(gameWordCode)).toBe(true);
    });

    it.each`
      gameWordCode
      ${'AB' /* too short */}
      ${'ABCDE' /* too long */}
      ${'aBC' /* has lowercase */}
      ${'aBCD' /* has lowercase */}
      ${'0BC' /* has numbers */}
      ${'0BCD' /* has numbers */}
    `('WHEN gameWord=$gameWordCode THEN invalid', ({ gameWordCode }) => {
      expect(new RegExp(GetGameWordCodeValidationRule.pattern || '').test(gameWordCode)).toBe(false);
    });
  });

  describe.each`
    number                  | length | code
    ${0}                    | ${6}   | ${'AAA'}
    ${parseInt('89a', 26)}  | ${6}   | ${'IJK'}
    ${parseInt('nop', 26)}  | ${6}   | ${'XYZ'}
    ${0}                    | ${7}   | ${'AAAA'}
    ${parseInt('89ab', 26)} | ${7}   | ${'IJKL'}
    ${parseInt('mnop', 26)} | ${7}   | ${'WXYZ'}
  `('GameWordCode to number Conversion', ({ number, length, code }) => {
    it(`${FOR_TESTING.convertNumberToCode.name} > WHEN number=${number} and length=${length}, THEN code=${code}`, () => {
      const actualCode = FOR_TESTING.convertNumberToCode(number, length);
      expect(actualCode).toBe(code);
    });

    it(`${FOR_TESTING.convertCodeToNumber.name} > WHEN code=${code} THEN number=${number}`, () => {
      const actualCode = FOR_TESTING.convertCodeToNumber(code);
      expect(actualCode).toBe(number);
    });
  });
});
