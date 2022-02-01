import type { GuessWordScore } from '../../../domain/guess-word-service';

type ScoreCellsProps = {
  rowIndex: number;
  variant: 'SCORE' | 'CORRECTNESS';
  score?: GuessWordScore;
};

export const ScoreCells = ({ rowIndex, variant = 'SCORE', score }: ScoreCellsProps) => (
  <>
    {variant === 'SCORE' && (
      <span className="guess-word-cell --score-cell" style={{ gridArea: `round-${rowIndex}-score` }}>
        {score?.score ?? <>&nbsp;</>}
      </span>
    )}

    {variant === 'CORRECTNESS' && (
      <>
        <span className="guess-word-cell --matching-cell" style={{ gridArea: `round-${rowIndex}-matching-letter` }}>
          {score?.matchingLetters ?? <>&nbsp;</>}
        </span>
        <span
          className="guess-word-cell --non-matching-cell"
          style={{ gridArea: `round-${rowIndex}-non-matching-letter` }}
        >
          {score?.nonMatchingLetters ?? <>&nbsp;</>}
        </span>
      </>
    )}
  </>
);
