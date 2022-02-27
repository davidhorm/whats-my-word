import { IndividualCharacterInputs } from '../../../components/IndividualCharacterInputs';
import type { ClientGameState } from '../../../use-cases/use-game-state';

type GameWordCellsProps = Pick<ClientGameState, 'gameWordRevealed' | 'gameWordLength'>;

export const GameWordCells = ({ gameWordLength, gameWordRevealed = '' }: GameWordCellsProps) => {
  const inputProps = Array.from({ length: gameWordLength }).map((_, index) => ({
    className: `rounded-sm border border-black/40 p-0 ring-inset uppercase text-2xl text-center ${
      !!gameWordRevealed && 'bg-zinc-500/25 text-black/40'
    }`,
    style: { gridArea: `game-word-letter-${index}` },
  }));

  return <IndividualCharacterInputs amount={gameWordLength} value={gameWordRevealed} inputProps={inputProps} />;
};
