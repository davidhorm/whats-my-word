import type { ClientGameState } from '../../../use-cases/use-game-state';

type FinalScoreRowsProps = Pick<ClientGameState, 'bonusPoints' | 'totalScore'>;

export const FinalScoreRows = ({ bonusPoints, totalScore }: FinalScoreRowsProps) => (
  <>
    <span className="--align-right" style={{ gridArea: 'bonus-point-label' }}>
      Bonus Points:
    </span>
    <span className="--align-right" style={{ gridArea: 'bonus-point-value' }}>
      {bonusPoints}
    </span>
    <span className="--align-right" style={{ gridArea: 'total-score-label' }}>
      Total Score:
    </span>
    <span className="--align-right" style={{ gridArea: 'total-score-value' }}>
      {totalScore}
    </span>
  </>
);
