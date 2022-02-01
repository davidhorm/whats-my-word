import type { ClientGameState } from '../../../use-cases/use-game-state';

type FinalScoreRowsProps = Pick<ClientGameState, 'bonusPoints' | 'totalScore'>;

export const FinalScoreRows = ({ bonusPoints, totalScore }: FinalScoreRowsProps) => (
  <>
    <span style={{ gridArea: 'bonus-point-label' }}>Bonus Points:</span>
    <span style={{ gridArea: 'bonus-point-value' }}>{bonusPoints}</span>
    <span style={{ gridArea: 'total-score-label' }}>Total Score:</span>
    <span style={{ gridArea: 'total-score-value' }}>{totalScore}</span>
  </>
);
