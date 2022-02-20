import type { ClientGameState } from '../../../use-cases/use-game-state';

type FinalScoreRowsProps = Pick<ClientGameState, 'gameWordRevealed' | 'bonusPoints' | 'totalScore'>;

export const FinalScoreRows = ({ gameWordRevealed, bonusPoints, totalScore }: FinalScoreRowsProps) => (
  <>
    <span className="--align-right" style={{ gridArea: 'bonus-point-label' }}>
      Final Guess Bonus Points:
    </span>
    <span className="--align-right --mono-font" style={{ gridArea: 'bonus-point-value' }}>
      {gameWordRevealed ? bonusPoints : 'N/A'}
    </span>
    <span className="--align-right" style={{ gridArea: 'total-score-label' }}>
      Total Score:
    </span>
    <span className="--align-right --mono-font" style={{ gridArea: 'total-score-value' }}>
      {totalScore}
    </span>
  </>
);
