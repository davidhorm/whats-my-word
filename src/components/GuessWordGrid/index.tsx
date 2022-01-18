import { ComponentProps } from 'react';
import type { ClientGameState } from '../../use-cases/use-game-state';
import { GameWordCells } from './GameWordCells';
import './grid.css';
import { LetterCells } from './LetterCells';
import { ScoreCells } from './ScoreCells';

type GuessWordGridProp = Omit<ClientGameState, 'validationRule' | 'submitGuessWord'> &
  Pick<ComponentProps<typeof ScoreCells>, 'variant'>;

export const GuessWordGrid = ({ gameWordLength, rounds = [], variant, gameWordRevealed }: GuessWordGridProp) => (
  <div className="guess-word-grid">
    <GameWordCells gameWordLength={gameWordLength} gameWordRevealed={gameWordRevealed} />
    {Array.from({ length: 11 }).map((_, rowIndex) => (
      <>
        <LetterCells rowIndex={rowIndex} gameWordLength={gameWordLength} guessWordLetters={rounds[rowIndex]?.letters} />
        <ScoreCells rowIndex={rowIndex} variant={variant} score={rounds[rowIndex]?.score} />
      </>
    ))}
  </div>
);
