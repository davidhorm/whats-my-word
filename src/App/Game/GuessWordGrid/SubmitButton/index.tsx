import type { CSSProperties } from 'react';
import type { GameRoundNumber } from '../../../../domain/guess-word-service';
import type { ScoreCellsVariant } from '../ScoreCells';

const getStyle = (scoreCellsVariant: ScoreCellsVariant, rowIndex: GameRoundNumber): CSSProperties =>
  scoreCellsVariant === 'SCORE'
    ? { gridArea: `round-${rowIndex}-score` }
    : { gridColumn: `round-${rowIndex}-matching-letter`, gridRow: `round-${rowIndex}-matching-letter` };

type Props = { scoreCellsVariant: ScoreCellsVariant; rowIndex: GameRoundNumber };
export const SubmitButton = ({ scoreCellsVariant, rowIndex }: Props) => (
  <input
    type="submit"
    value="SUBMIT"
    className="guess-word-cell --score-cell --cursor"
    style={getStyle(scoreCellsVariant, rowIndex)}
  />
);
