import { useInitGameState } from './use-init-game-state';

describe('useInitGameState', () => {
  const { GenerateGameWordCode, GenerateRandomGameWordCode, GetGameWordCodeValidationRule, GetGameWordValidationRule } =
    useInitGameState;

  it.each`
    providedGameWord
    ${'AREOLA'}
    ${'FARTING'}
  `(
    'WHEN providedGameWord=$providedGameWord, THEN is considered valid and produces valid code',
    ({ providedGameWord }) => {
      const isGameWordValid = new RegExp(GetGameWordValidationRule.pattern || '').test(providedGameWord);
      expect(isGameWordValid).toBe(true);

      const code = GenerateGameWordCode(providedGameWord);
      const isCodeValid = new RegExp(GetGameWordCodeValidationRule.pattern || '').test(code);
      expect(isCodeValid).toBe(true);
    }
  );

  it.each`
    gameWordLength
    ${6}
    ${7}
  `(`WHEN ${GenerateRandomGameWordCode.name}($gameWordLength), THEN code generated is valid`, ({ gameWordLength }) => {
    const randomCode = GenerateRandomGameWordCode(gameWordLength);
    const isCodeValid = new RegExp(GetGameWordCodeValidationRule.pattern || '').test(randomCode);
    expect(isCodeValid).toBe(true);
  });
});
