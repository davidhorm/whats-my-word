import { MouseEventHandler, useState } from 'react';

const colorClassNames = ['bg-zinc-500/25 text-black/40', 'bg-green-100', 'bg-yellow-100'];

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
          className={`border-black/40 cursor-pointer rounded-sm border p-0 text-center text-2xl uppercase ring-inset ${
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
