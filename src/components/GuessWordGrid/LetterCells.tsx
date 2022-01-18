/**
 * The guess word lengths. Add with the actual word length to get the value.
 * The position in the array represents the row index.
 */
const GUESS_WORD_LENGTHS = [-4, -3, -3, -3, -3, -2, -2, -2, -1, -1, 0];

type LetterCellsProps = {
  gameWordLength: number;
  guessWordLetters?: string[];
  rowIndex: number;
};

export const LetterCells = ({ gameWordLength, guessWordLetters, rowIndex }: LetterCellsProps) => {
  const guessLetters = guessWordLetters?.join('').toUpperCase().split('') || [];

  return (
    <>
      {Array.from({ length: gameWordLength + GUESS_WORD_LENGTHS[rowIndex] }).map((_, colIndex) => (
        <span
          key={`${rowIndex}_${colIndex}`}
          className="guess-word-cell --letter-cell"
          style={{ gridArea: `round-${rowIndex}-letter-${colIndex}` }}
        >
          {guessLetters[colIndex] || <>&nbsp;</>}
        </span>
      ))}
    </>
  );
};
