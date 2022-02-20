import { ComponentProps } from 'react';
import { IndividualCharacterInputs } from '../IndividualCharacterInputs';
import { LetterButtons } from './LetterButtons';

/**
 * The guess word lengths. Add with the actual word length to get the value.
 * The position in the array represents the row index.
 */
const GUESS_WORD_LENGTHS = [-4, -3, -3, -3, -3, -2, -2, -2, -1, -1, 0];

type LetterCellsProps = Pick<ComponentProps<typeof IndividualCharacterInputs>, 'onChange'> & {
  gameWordLength: number;
  guessWordLetters?: string[];
  rowIndex: number;
  disabled: boolean;
};

export const LetterCells = ({ gameWordLength, guessWordLetters, rowIndex, disabled, onChange }: LetterCellsProps) => {
  const guessWord = guessWordLetters?.join('');
  const guessWordLength = gameWordLength + GUESS_WORD_LENGTHS[rowIndex];
  const inputProps = Array.from({ length: guessWordLength }).map((_, colIndex) => ({
    disabled,
    required: true,
    className: `guess-word-cell --letter-cell --align-center ${disabled && '--disabled-cell'}`,
    style: { gridArea: `round-${rowIndex}-letter-${colIndex}` },
    id: `round-${rowIndex}-letter-${colIndex}`,
  }));

  if (guessWord) return <LetterButtons guessWord={guessWord} rowIndex={rowIndex} />;

  return (
    <IndividualCharacterInputs amount={guessWordLength} inputProps={inputProps} value={guessWord} onChange={onChange} />
  );
};
