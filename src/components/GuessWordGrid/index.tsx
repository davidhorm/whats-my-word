import './grid.css';

/**
 * The guess word lengths. Add with the actual word length to get the value.
 * The position in the array represents the row index.
 */
const GUESS_WORD_LENGTHS = [-4, -3, -3, -3, -3, -2, -2, -2, -1, -1, 0];

type GuessWordGridProp = {
  gameWordLength: number;
  // gameRoundNumber: number;
  // gameRoundData: ClientGameRound;
  variant: 'SCORE' | 'CORRECTNESS';
};

export const GuessWordGrid = ({ gameWordLength, variant = 'SCORE' }: GuessWordGridProp) => (
  <div className="guess-word-grid">
    {Array.from({ length: 11 }).map((_, rowIndex) => (
      <>
        {Array.from({ length: gameWordLength + GUESS_WORD_LENGTHS[rowIndex] }).map((__, colIndex) => (
          <span
            key={`${rowIndex}_${colIndex}`}
            className="guess-word-cell --letter-cell"
            style={{ gridArea: `round-${rowIndex}-letter-${colIndex}` }}
          >
            &nbsp;
          </span>
        ))}

        {variant === 'SCORE' && (
          <span className="guess-word-cell --score-cell" style={{ gridArea: `round-${rowIndex}-score` }}>
            &nbsp;
          </span>
        )}

        {variant === 'CORRECTNESS' && (
          <>
            <span className="guess-word-cell --matching-cell" style={{ gridArea: `round-${rowIndex}-matching-letter` }}>
              &nbsp;
            </span>
            <span
              className="guess-word-cell --non-matching-cell"
              style={{ gridArea: `round-${rowIndex}-non-matching-letter` }}
            >
              &nbsp;
            </span>
          </>
        )}
      </>
    ))}
  </div>
  // <>
  //   {gameRoundData.letters.map((letter, letterIndex) => {
  //     if (letter) {
  //       const letterClassName = getLetterClassName(gameRoundNumber, letterIndex);
  //       return (
  //         <span key={letterClassName} className={`${letterClassName} guess-word-grid-letter-cell`}>
  //           {letter}
  //         </span>
  //       );
  //     }
  //   })}

  // </>
);
