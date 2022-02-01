import { useGameState } from '../../use-cases/use-game-state';
import { GuessWordGrid } from './GuessWordGrid';

type Props = { code: string };
export const Game = ({ code }: Props) => {
  const { clientGameState } = useGameState({ code });

  return <GuessWordGrid {...clientGameState} variant="SCORE" />;
};
