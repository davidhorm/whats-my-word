import { IndividualCharacterInputs } from '../../../components/IndividualCharacterInputs';
import type { ClientGameState } from '../../../use-cases/use-game-state';

type GameWordCellsProps = Pick<ClientGameState, 'gameWordRevealed' | 'gameWordLength'>;

export const GameWordCells = ({ gameWordLength, gameWordRevealed = '' }: GameWordCellsProps) => {
  const inputProps = Array.from({ length: gameWordLength }).map((_, index) => ({
    className: `guess-word-cell --letter-cell --align-center ${!!gameWordRevealed && '--disabled-cell'}`,
    style: { gridArea: `game-word-letter-${index}` },
  }));

  return <IndividualCharacterInputs amount={gameWordLength} value={gameWordRevealed} inputProps={inputProps} />;
};
