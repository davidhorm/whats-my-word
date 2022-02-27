import { ComponentProps, FormEvent, Fragment, useState } from 'react';
import type { GameRoundNumber } from '../../domain/guess-word-service';
import type { ClientGameState } from '../../use-cases/use-game-state';
import {
  CodeLabel,
  FinalScoreRows,
  GameWordCells,
  getGridTemplateAreas,
  LetterCells,
  ScoreCells,
  SubmitButton,
} from './guess-word-grid';

type GuessWordGridProp = Omit<ClientGameState, 'validationRule'> &
  Pick<ComponentProps<typeof ScoreCells>, 'variant'> &
  ComponentProps<typeof CodeLabel>;

export const GuessWordGrid = ({
  bonusPoints,
  code,
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
    <form
      className="grid gap-2 [--cell-size:clamp(1.5rem,7.5vw,2rem)] [grid-template-rows:repeat(12,var(--cell-size))]"
      style={{
        gridTemplateAreas: getGridTemplateAreas(gameWordLength, variant),
        gridTemplateColumns: `repeat(${gameWordLength + 2}, var(--cell-size))`,
      }}
      onSubmit={handleSubmit}
    >
      <GameWordCells gameWordLength={gameWordLength} gameWordRevealed={gameWordRevealed} />

      <CodeLabel code={code} />

      {Array.from({ length: 11 }).map((_, rowIndex) => (
        <Fragment key={rowIndex}>
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
            <SubmitButton rowIndex={rowIndex as GameRoundNumber} scoreCellsVariant={variant} />
          )}
        </Fragment>
      ))}

      <FinalScoreRows gameWordRevealed={gameWordRevealed} bonusPoints={bonusPoints} totalScore={totalScore} />
    </form>
  );
};
