import { ComponentProps } from 'react';
import type { ClientGameRound } from '../../use-cases/use-game-state';
import './grid.css';
import { LetterCells } from './LetterCells';
import { ScoreCells } from './ScoreCells';

type GuessWordGridProp = {
  rounds: ClientGameRound[];
} & Pick<ComponentProps<typeof ScoreCells>, 'variant'> &
  Pick<ComponentProps<typeof LetterCells>, 'gameWordLength'>;

export const GuessWordGrid = ({ gameWordLength, rounds = [], variant }: GuessWordGridProp) => (
  <div className="guess-word-grid">
    {Array.from({ length: 11 }).map((_, rowIndex) => (
      <>
        <LetterCells rowIndex={rowIndex} gameWordLength={gameWordLength} guessWordLetters={rounds[rowIndex]?.letters} />
        <ScoreCells rowIndex={rowIndex} variant={variant} score={rounds[rowIndex]?.score} />
      </>
    ))}
  </div>
);
