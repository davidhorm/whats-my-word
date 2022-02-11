import type { GameWordLength } from '../../../domain/game-word-service';
import type { ScoreCellsVariant } from './ScoreCells';

const letterColumns = [
  'game-word-letter-0 game-word-letter-1 game-word-letter-2 game-word-letter-3 game-word-letter-4 game-word-letter-5',
  'round-0-letter-0   round-0-letter-1   round-0-letter-2   .                  .                  .                 ',
  'round-1-letter-0   round-1-letter-1   round-1-letter-2   round-1-letter-3   .                  .                 ',
  '.                  round-2-letter-0   round-2-letter-1   round-2-letter-2   round-2-letter-3   .                 ',
  '.                  .                  round-3-letter-0   round-3-letter-1   round-3-letter-2   round-3-letter-3  ',
  '.                  .                  .                  round-4-letter-0   round-4-letter-1   round-4-letter-2  ',
  '.                  .                  round-5-letter-0   round-5-letter-1   round-5-letter-2   round-5-letter-3  ',
  '.                  round-6-letter-0   round-6-letter-1   round-6-letter-2   round-6-letter-3   round-6-letter-4  ',
  'round-7-letter-0   round-7-letter-1   round-7-letter-2   round-7-letter-3   round-7-letter-4   .                 ',
  'round-8-letter-0   round-8-letter-1   round-8-letter-2   round-8-letter-3   round-8-letter-4   round-8-letter-5  ',
  '.                  round-9-letter-0   round-9-letter-1   round-9-letter-2   round-9-letter-3   round-9-letter-4  ',
  'round-10-letter-0  round-10-letter-1  round-10-letter-2  round-10-letter-3  round-10-letter-4  round-10-letter-5 ',
  'bonus-point-label  bonus-point-label  bonus-point-label  bonus-point-label  bonus-point-label  bonus-point-label ',
  'total-score-label  total-score-label  total-score-label  total-score-label  total-score-label  total-score-label ',
];

const getSeventhLetterColumns = (gameWordLength: GameWordLength, index: number) => {
  const seventhLetterColumns = [
    'game-word-letter-6',
    '.                 ',
    '.                 ',
    '.                 ',
    '.                 ',
    'round-4-letter-3  ',
    'round-5-letter-4  ',
    '.                 ',
    '.                 ',
    '.                 ',
    'round-9-letter-5  ',
    'round-10-letter-6 ',
    'bonus-point-label ',
    'total-score-label ',
  ];

  return gameWordLength === 7 ? seventhLetterColumns[index] : '';
};

const getScoreCells = (scoreCellsVariant: ScoreCellsVariant, index: number) => {
  const scoreColumns = [
    '.                ',
    'round-0-score    ',
    'round-1-score    ',
    'round-2-score    ',
    'round-3-score    ',
    'round-4-score    ',
    'round-5-score    ',
    'round-6-score    ',
    'round-7-score    ',
    'round-8-score    ',
    'round-9-score    ',
    'round-10-score   ',
    'bonus-point-value',
    'total-score-value',
  ];

  const letterCountColumns = [
    '.                        .',
    'round-0-matching-letter  round-0-non-matching-letter',
    'round-1-matching-letter  round-1-non-matching-letter',
    'round-2-matching-letter  round-2-non-matching-letter',
    'round-3-matching-letter  round-3-non-matching-letter',
    'round-4-matching-letter  round-4-non-matching-letter',
    'round-5-matching-letter  round-5-non-matching-letter',
    'round-6-matching-letter  round-6-non-matching-letter',
    'round-7-matching-letter  round-7-non-matching-letter',
    'round-8-matching-letter  round-8-non-matching-letter',
    'round-9-matching-letter  round-9-non-matching-letter',
    'round-10-matching-letter round-10-non-matching-letter',
    'bonus-point-value        bonus-point-value',
    'total-score-value        total-score-value',
  ];

  return scoreCellsVariant === 'SCORE' ? scoreColumns[index] : letterCountColumns[index];
};

export const getGridTemplateAreas = (gameWordLength: GameWordLength, scoreCellsVariant: ScoreCellsVariant) => `
  "${letterColumns[0]}  ${getSeventhLetterColumns(gameWordLength, 0)}  ${getScoreCells(scoreCellsVariant, 0)}"
  "${letterColumns[1]}  ${getSeventhLetterColumns(gameWordLength, 1)}  ${getScoreCells(scoreCellsVariant, 1)}"
  "${letterColumns[2]}  ${getSeventhLetterColumns(gameWordLength, 2)}  ${getScoreCells(scoreCellsVariant, 2)}"
  "${letterColumns[3]}  ${getSeventhLetterColumns(gameWordLength, 3)}  ${getScoreCells(scoreCellsVariant, 3)}"
  "${letterColumns[4]}  ${getSeventhLetterColumns(gameWordLength, 4)}  ${getScoreCells(scoreCellsVariant, 4)}"
  "${letterColumns[5]}  ${getSeventhLetterColumns(gameWordLength, 5)}  ${getScoreCells(scoreCellsVariant, 5)}"
  "${letterColumns[6]}  ${getSeventhLetterColumns(gameWordLength, 6)}  ${getScoreCells(scoreCellsVariant, 6)}"
  "${letterColumns[7]}  ${getSeventhLetterColumns(gameWordLength, 7)}  ${getScoreCells(scoreCellsVariant, 7)}"
  "${letterColumns[8]}  ${getSeventhLetterColumns(gameWordLength, 8)}  ${getScoreCells(scoreCellsVariant, 8)}"
  "${letterColumns[9]}  ${getSeventhLetterColumns(gameWordLength, 9)}  ${getScoreCells(scoreCellsVariant, 9)}"
  "${letterColumns[10]} ${getSeventhLetterColumns(gameWordLength, 10)} ${getScoreCells(scoreCellsVariant, 10)}"
  "${letterColumns[11]} ${getSeventhLetterColumns(gameWordLength, 11)} ${getScoreCells(scoreCellsVariant, 11)}"
  "${letterColumns[12]} ${getSeventhLetterColumns(gameWordLength, 12)} ${getScoreCells(scoreCellsVariant, 12)}"
  "${letterColumns[13]} ${getSeventhLetterColumns(gameWordLength, 13)} ${getScoreCells(scoreCellsVariant, 13)}"
`;
