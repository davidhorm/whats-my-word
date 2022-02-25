import type { GuessWordScore } from '../../../domain/guess-word-service';

export type ScoreCellsVariant = 'SCORE' | 'CORRECTNESS';

type ScoreCellsProps = {
  rowIndex: number;
  variant: ScoreCellsVariant;
  score?: GuessWordScore;
};

export const ScoreCells = ({ rowIndex, variant = 'SCORE', score }: ScoreCellsProps) => (
  <>
    {variant === 'SCORE' && (
      <span
        className="guess-word-cell --align-right --score-cell --mono-font"
        style={{ gridArea: `round-${rowIndex}-score` }}
      >
        {score?.score ?? <>&nbsp;</>}
      </span>
    )}

    {variant === 'CORRECTNESS' && (
      <>
        <span
          className="guess-word-cell --matching-cell --mono-font --align-center"
          style={{ gridArea: `round-${rowIndex}-matching-letter` }}
        >
          {score?.matchingLetters ?? <>&nbsp;</>}
        </span>
        <span
          className="guess-word-cell --non-matching-cell --mono-font --align-center"
          style={{ gridArea: `round-${rowIndex}-non-matching-letter` }}
        >
          {score?.nonMatchingLetters ?? <>&nbsp;</>}
        </span>
      </>
    )}
  </>
);