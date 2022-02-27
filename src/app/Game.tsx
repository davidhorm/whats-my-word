import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGameState } from '../use-cases/use-game-state';
import { GuessWordGrid } from './game/GuessWordGrid';
import { NewGameMenu } from './NewGameMenu';

export const Game = () => {
  const { code } = useParams();
  const { clientGameState } = useGameState({ code });

  useEffect(() => {
    // Focus on next row of inputs after guess submitted
    const rowIndex = clientGameState.rounds.length;
    const cellId = `round-${rowIndex}-letter-0`;
    document.getElementById(cellId)?.focus();
  }, [clientGameState]);

  if (!code || !clientGameState.isGameStateValid)
    return (
      <div>
        <span className="font-mono">{code}</span> is an invalid code.
        <NewGameMenu />
      </div>
    );

  return (
    <main className="mt-4 flex flex-col items-center">
      <GuessWordGrid {...clientGameState} code={code!} variant="CORRECTNESS" />
    </main>
  );
};
