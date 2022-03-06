import { Button } from '@material-ui/core';
import type { CSSProperties } from 'react';
import type { GameRoundNumber } from '../../../domain/guess-word-service';
import type { ScoreCellsVariant } from './ScoreCells';

const getStyle = (scoreCellsVariant: ScoreCellsVariant, rowIndex: GameRoundNumber): CSSProperties =>
  scoreCellsVariant === 'SCORE'
    ? { gridArea: `round-${rowIndex}-score` }
    : { gridColumn: `round-${rowIndex}-matching-letter`, gridRow: `round-${rowIndex}-matching-letter` };

type Props = { scoreCellsVariant: ScoreCellsVariant; rowIndex: GameRoundNumber; disabled: boolean };
export const SubmitButton = ({ scoreCellsVariant, rowIndex, disabled }: Props) => (
  <Button
    variant="contained"
    color="primary"
    size="small"
    type="submit"
    className="border-black/40 cursor-pointer rounded-sm border p-0 ring-inset"
    style={getStyle(scoreCellsVariant, rowIndex)}
    disabled={disabled}
  >
    SUBMIT
  </Button>
);
