import type { ClientGameRound } from '../../../use-cases/use-game-state';

export type ScoreCellsVariant = 'SCORE' | 'CORRECTNESS';

type ScoreCellsProps = {
  rowIndex: number;
  variant: ScoreCellsVariant;
} & Partial<Pick<ClientGameRound, 'score'>>;

export const ScoreCells = ({ rowIndex, variant = 'SCORE', score }: ScoreCellsProps) => (
  <>
    {variant === 'SCORE' && (
      <span
        className="min-w-full rounded-sm border border-black/40 bg-cyan-100 p-0 text-right font-mono ring-inset [line-height:var(--cell-size)]"
        style={{ gridArea: `round-${rowIndex}-score` }}
      >
        {score?.score ?? <>&nbsp;</>}
      </span>
    )}

    {variant === 'CORRECTNESS' && (
      <>
        <span
          className="rounded-sm border border-black/40 bg-green-100 p-0 text-center font-mono ring-inset [line-height:var(--cell-size)]"
          style={{ gridArea: `round-${rowIndex}-matching-letter` }}
        >
          {score?.matchingLetters ?? <>&nbsp;</>}
        </span>
        <span
          className="rounded-sm border border-black/40 bg-yellow-100 p-0 text-center font-mono ring-inset [line-height:var(--cell-size)]"
          style={{ gridArea: `round-${rowIndex}-non-matching-letter` }}
        >
          {score?.nonMatchingLetters ?? <>&nbsp;</>}
        </span>
      </>
    )}
  </>
);
