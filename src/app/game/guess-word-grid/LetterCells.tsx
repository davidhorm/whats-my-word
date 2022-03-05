import { useEffect } from 'react';
import { IndividualCharacterInputs } from '../../../components/IndividualCharacterInputs';
import { useGuessWordValidation } from '../../../use-cases/use-word-validation';
import { LetterButtons } from './letter-cells/LetterButtons';

/**
 * The guess word lengths. Add with the actual word length to get the value.
 * The position in the array represents the row index.
 */
const GUESS_WORD_LENGTHS = [-4, -3, -3, -3, -3, -2, -2, -2, -1, -1, 0];

type LetterCellsProps = {
  gameWordLength: number;
  guessWordLetters?: string[];
  rowIndex: number;
  disabled: boolean;
  onChange: (word: string, isValid: boolean) => void;
};

export const LetterCells = ({ gameWordLength, guessWordLetters, rowIndex, disabled, onChange }: LetterCellsProps) => {
  const guessWord = guessWordLetters?.join('');
  const guessWordLength = gameWordLength + GUESS_WORD_LENGTHS[rowIndex];
  const { state, setWord } = useGuessWordValidation(guessWordLength);

  useEffect(() => {
    !!onChange && onChange(state.word, state.isValid);
  }, [state.word, state.isValid, onChange]);

  const inputProps = Array.from({ length: guessWordLength }).map((_, colIndex) => ({
    disabled,
    required: true,
    className: `rounded-sm border border-black/40 p-0 ring-inset uppercase text-2xl text-center ${
      disabled && 'bg-zinc-500/25 text-black/40'
    } ${state.word.length === guessWordLength && !state.isValid && 'border-error text-error'}`,
    style: { gridArea: `round-${rowIndex}-letter-${colIndex}` },
    id: `round-${rowIndex}-letter-${colIndex}`,
  }));

  if (guessWord) return <LetterButtons guessWord={guessWord} rowIndex={rowIndex} />;

  return (
    <IndividualCharacterInputs amount={guessWordLength} inputProps={inputProps} value={guessWord} onChange={setWord} />
  );
};
