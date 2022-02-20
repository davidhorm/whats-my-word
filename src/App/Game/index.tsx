import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGameState } from '../../use-cases/use-game-state';
import { GuessWordGrid } from './GuessWordGrid';

export const Game = () => {
  const { code } = useParams();
  const { clientGameState } = useGameState({ code });

  useEffect(() => {
    // Focus on next row of inputs after guess submitted
    const rowIndex = clientGameState.rounds.length;
    const cellId = `round-${rowIndex}-letter-0`;
    document.getElementById(cellId)?.focus();
  }, [clientGameState]);

  return <GuessWordGrid {...clientGameState} code={code!} variant="CORRECTNESS" />;
};
