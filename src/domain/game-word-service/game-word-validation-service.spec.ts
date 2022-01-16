import { GetGameWordValidationRule } from './game-word-validation-service';

describe('GetGameWordValidationRule', () => {
  it.each`
    gameWord
    ${'ABCDEF'}
    ${'ABCDEFG'}
  `('WHEN gameWord=$gameWord THEN valid', ({ gameWord }) => {
    expect(new RegExp(GetGameWordValidationRule.pattern || '').test(gameWord)).toBe(true);
  });

  it.each`
    gameWord
    ${'ABCDE' /* too short */}
    ${'ABCDEFGH' /* too long */}
    ${'aBCDEF' /* has lowercase */}
    ${'aBCDEFG' /* has lowercase */}
    ${'0BCDEF' /* has numbers */}
    ${'0BCDEFG' /* has numbers */}
  `('WHEN gameWord=$gameWord THEN invalid', ({ gameWord }) => {
    expect(new RegExp(GetGameWordValidationRule.pattern || '').test(gameWord)).toBe(false);
  });
});
