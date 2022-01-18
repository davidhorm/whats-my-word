import type { ClientGameState } from '../../use-cases/use-game-state';

type GameWordCellsProps = Pick<ClientGameState, 'gameWordRevealed' | 'gameWordLength'>;

export const GameWordCells = ({ gameWordLength, gameWordRevealed = '' }: GameWordCellsProps) => {
  const letters = gameWordRevealed.toUpperCase().split('');

  return (
    <>
      {Array.from({ length: gameWordLength }).map((_, index) => (
        <div key={index} className="guess-word-cell" style={{ gridArea: `game-word-letter-${index}` }}>
          {letters[index] || '-'}
        </div>
      ))}
    </>
  );
};
