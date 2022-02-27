import type { ClientGameState } from '../../../use-cases/use-game-state';

type FinalScoreRowsProps = Pick<ClientGameState, 'gameWordRevealed' | 'bonusPoints' | 'totalScore'>;

export const FinalScoreRows = ({ gameWordRevealed, bonusPoints, totalScore }: FinalScoreRowsProps) => (
  <>
    <span className="text-right [grid-area:bonus-point-label]">Final Guess Bonus Points:</span>
    <span className="text-right font-mono [grid-area:bonus-point-value]">{gameWordRevealed ? bonusPoints : 'N/A'}</span>
    <span className="text-right [grid-area:total-score-label]">Total Score:</span>
    <span className="text-right font-mono [grid-area:total-score-value]">{totalScore}</span>
  </>
);
