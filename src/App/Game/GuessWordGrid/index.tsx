import { ComponentProps, FormEvent, useState } from 'react';
import type { ClientGameState } from '../../../use-cases/use-game-state';
import { FinalScoreRows } from './FinalScoreRows';
import { GameWordCells } from './GameWordCells';
import './grid.css';
import { LetterCells } from './LetterCells';
import { ScoreCells } from './ScoreCells';

type GuessWordGridProp = Omit<ClientGameState, 'validationRule'> & Pick<ComponentProps<typeof ScoreCells>, 'variant'>;

export const GuessWordGrid = ({
  bonusPoints,
  gameWordLength,
  gameWordRevealed,
  rounds = [],
  totalScore,
  variant,
  submitGuessWord,
}: GuessWordGridProp) => {
  const [guessWord, setGuessWord] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitGuessWord && submitGuessWord(guessWord);
  };

  return (
    <form className="guess-word-grid" onSubmit={handleSubmit}>
      <GameWordCells gameWordLength={gameWordLength} gameWordRevealed={gameWordRevealed} />

      {Array.from({ length: 11 }).map((_, rowIndex) => (
        <>
          <LetterCells
            rowIndex={rowIndex}
            disabled={rowIndex !== rounds.length}
            gameWordLength={gameWordLength}
            guessWordLetters={rounds[rowIndex]?.letters}
            onChange={(word) => setGuessWord(word)}
          />

          {rowIndex < rounds.length && (
            <ScoreCells rowIndex={rowIndex} variant={variant} score={rounds[rowIndex]?.score} />
          )}

          {rowIndex === rounds.length && (
            <input
              type="submit"
              value="SUBMIT"
              className="guess-word-cell --score-cell"
              style={{ gridArea: `round-${rowIndex}-score` }}
            />
          )}
        </>
      ))}

      {variant === 'SCORE' && <FinalScoreRows bonusPoints={bonusPoints} totalScore={totalScore} />}
    </form>
  );
};
