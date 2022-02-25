import { MouseEventHandler, useState } from 'react';

const colorClassNames = ['--disabled-cell', '--matching-cell', '--non-matching-cell'];

type Props = { guessWord: string; rowIndex: number };
export const LetterButtons = ({ guessWord, rowIndex }: Props) => {
  const [buttonColorIndices, setButtonColorIndices] = useState(Array.from({ length: guessWord.length }, () => 0));

  const toggleColor: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const buttonIndex = parseInt(event.currentTarget.name, 10);
    const newColorIndex = (buttonColorIndices[buttonIndex] + 1) % colorClassNames.length;
    const newButtonColors = [...buttonColorIndices];
    newButtonColors.splice(buttonIndex, 1, newColorIndex);
    setButtonColorIndices(newButtonColors);
  };

  return (
    <>
      {guessWord.split('').map((letter, colIndex) => (
        <button
          key={colIndex}
          name={`${colIndex}`}
          className={`guess-word-cell --letter-cell --align-center --cursor ${
            colorClassNames[buttonColorIndices[colIndex]]
          }`}
          style={{ gridArea: `round-${rowIndex}-letter-${colIndex}` }}
          onClick={toggleColor}
        >
          {letter}
        </button>
      ))}
    </>
  );
};
