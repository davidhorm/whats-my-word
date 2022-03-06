import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useGameState, type ClientGameState } from './use-game-state';

describe(useGameState.name, () => {
  const defaultGameState = {
    gameWordLength: 6,
    gameWordRevealed: '',
    bonusPoints: 0,
    rounds: [],
    totalScore: 0,
    emojiResults: '',
  };

  const queryId = 'clientGameState';
  const TestGameState = ({ code }: any) => {
    const {
      clientGameState: {
        rounds,
        bonusPoints,
        totalScore,
        submitGuessWord,
        gameWordLength,
        gameWordRevealed,
        emojiResults,
      },
    } = useGameState({ code });
    return (
      <div>
        <code id={queryId}>
          {JSON.stringify({ rounds, bonusPoints, totalScore, gameWordLength, gameWordRevealed, emojiResults })}
        </code>
        <label htmlFor="guess-word">Guess Word:</label>
        <input id="guess-word" type="text" />
        <button
          onClick={() =>
            submitGuessWord && submitGuessWord((document.querySelector('#guess-word') as HTMLInputElement).value)
          }
        >
          Submit
        </button>
      </div>
    );
  };

  it('should render the guesses for "nephew" with bonus points', () => {
    const { container } = render(<TestGameState code="OWS" />);
    const firstJsonText = container.querySelector(`#${queryId}`)?.innerHTML || '{}';
    const firstJsonObject = JSON.parse(firstJsonText);
    expect(firstJsonObject).toEqual(defaultGameState);

    const guessWords = ['so', 'den', 'ebb', 'inn', 'bid', 'turn', 'earl', 'newt', 'newel', 'endow', 'nephew'];

    const finalGuessLetters = [
      ['s', 'o', '', '', '', ''],
      ['d', 'e', 'n', '', '', ''],
      ['', 'e', 'b', 'b', '', ''],
      ['', '', 'i', 'n', 'n', ''],
      ['', '', '', 'b', 'i', 'd'],
      ['', '', 't', 'u', 'r', 'n'],
      ['', 'e', 'a', 'r', 'l', ''],
      ['n', 'e', 'w', 't', '', ''],
      ['n', 'e', 'w', 'e', 'l', ''],
      ['', 'e', 'n', 'd', 'o', 'w'],
      ['n', 'e', 'p', 'h', 'e', 'w'],
    ];

    const finalGuessScores = [
      { score: 0, matchingLetters: 0, nonMatchingLetters: 0 },
      { score: 1250, matchingLetters: 1, nonMatchingLetters: 1 },
      { score: 1000, matchingLetters: 1, nonMatchingLetters: 0 },
      { score: 250, matchingLetters: 0, nonMatchingLetters: 1 },
      { score: 0, matchingLetters: 0, nonMatchingLetters: 0 },
      { score: 250, matchingLetters: 0, nonMatchingLetters: 1 },
      { score: 1000, matchingLetters: 1, nonMatchingLetters: 0 },
      { score: 2250, matchingLetters: 2, nonMatchingLetters: 1 },
      { score: 2500, matchingLetters: 2, nonMatchingLetters: 2 },
      { score: 2250, matchingLetters: 2, nonMatchingLetters: 1 },
      { score: 6000, matchingLetters: 6, nonMatchingLetters: 0 },
    ];

    const finalGuesses = finalGuessLetters.map((letters, index) => ({ letters, score: finalGuessScores[index] }));

    const finalEmojiResults = `
⬜⬜⬛⬛⬛⬛
⬜🟩🟨⬛⬛⬛
⬛🟩⬜⬜⬛⬛
⬛⬛⬜🟨⬜⬛
⬛⬛⬛⬜⬜⬜
⬛⬛⬜⬜⬜🟨
⬛🟩⬜⬜⬜⬛
🟩🟩🟨⬜⬛⬛
🟩🟩🟨🟨⬜⬛
⬛🟩🟨⬜⬜🟩
🟩🟩🟩🟩🟩🟩`;

    const totalScores = [0, 1250, 2250, 2500, 2500, 2750, 3750, 6000, 8500, 10750, 16750 + 3000];

    guessWords.forEach((guessWord, index) => {
      const textbox = screen.getByLabelText('Guess Word:');
      userEvent.clear(textbox);
      userEvent.type(textbox, guessWord);

      const button = screen.getByText('Submit');
      userEvent.click(button);

      const jsonText = container.querySelector(`#${queryId}`)?.innerHTML || '{}';
      const jsonObject = JSON.parse(jsonText) as ClientGameState;
      expect(jsonObject).toEqual({
        gameWordLength: 6,
        gameWordRevealed: index === 10 ? 'nephew' : '',
        rounds: finalGuesses.slice(0, index + 1),
        totalScore: totalScores[index],
        bonusPoints: index === 10 ? 3000 : 0,
        emojiResults: index === 10 ? finalEmojiResults : '',
      });
    });
  });

  it('should render the guesses for "ballet" without bonus points', () => {
    const { container } = render(<TestGameState code="BKS" />);
    const firstJsonText = container.querySelector(`#${queryId}`)?.innerHTML || '{}';
    const firstJsonObject = JSON.parse(firstJsonText);
    expect(firstJsonObject).toEqual(defaultGameState);

    const guessWords = ['an', 'car', 'act', 'toe', 'old', 'toot', 'dull', 'mail', 'falls', 'alter', 'wallet'];

    const finalGuessLetters = [
      ['a', 'n', '', '', '', ''],
      ['c', 'a', 'r', '', '', ''],
      ['', 'a', 'c', 't', '', ''],
      ['', '', 't', 'o', 'e', ''],
      ['', '', '', 'o', 'l', 'd'],
      ['', '', 't', 'o', 'o', 't'],
      ['', 'd', 'u', 'l', 'l', ''],
      ['m', 'a', 'i', 'l', '', ''],
      ['f', 'a', 'l', 'l', 's', ''],
      ['', 'a', 'l', 't', 'e', 'r'],
      ['w', 'a', 'l', 'l', 'e', 't'],
    ];

    const finalGuessScores = [
      { score: 250, matchingLetters: 0, nonMatchingLetters: 1 },
      { score: 1000, matchingLetters: 1, nonMatchingLetters: 0 },
      { score: 1250, matchingLetters: 1, nonMatchingLetters: 1 },
      { score: 1250, matchingLetters: 1, nonMatchingLetters: 1 },
      { score: 250, matchingLetters: 0, nonMatchingLetters: 1 },
      { score: 1000, matchingLetters: 1, nonMatchingLetters: 0 },
      { score: 1250, matchingLetters: 1, nonMatchingLetters: 1 },
      { score: 2000, matchingLetters: 2, nonMatchingLetters: 0 },
      { score: 3000, matchingLetters: 3, nonMatchingLetters: 0 },
      { score: 3250, matchingLetters: 3, nonMatchingLetters: 1 },
      { score: 5000, matchingLetters: 5, nonMatchingLetters: 0 },
    ];

    const finalGuesses = finalGuessLetters.map((letters, index) => ({ letters, score: finalGuessScores[index] }));

    const finalEmojiResults = `
🟨⬜⬛⬛⬛⬛
⬜🟩⬜⬛⬛⬛
⬛🟩⬜🟨⬛⬛
⬛⬛🟨⬜🟩⬛
⬛⬛⬛⬜🟨⬜
⬛⬛⬜⬜⬜🟩
⬛⬜⬜🟩🟨⬛
⬜🟩⬜🟩⬛⬛
⬜🟩🟩🟩⬜⬛
⬛🟩🟩🟨🟩⬜
⬜🟩🟩🟩🟩🟩`;

    const totalScores = [250, 1250, 2500, 3750, 4000, 5000, 6250, 8250, 11250, 14500, 19500];

    guessWords.forEach((guessWord, index) => {
      const textbox = screen.getByLabelText('Guess Word:');
      userEvent.clear(textbox);
      userEvent.type(textbox, guessWord);

      const button = screen.getByText('Submit');
      userEvent.click(button);

      const jsonText = container.querySelector(`#${queryId}`)?.innerHTML || '{}';
      const jsonObject = JSON.parse(jsonText) as ClientGameState;
      expect(jsonObject).toEqual({
        gameWordLength: 6,
        gameWordRevealed: index === 10 ? 'ballet' : '',
        rounds: finalGuesses.slice(0, index + 1),
        totalScore: totalScores[index],
        bonusPoints: 0,
        emojiResults: index === 10 ? finalEmojiResults : '',
      });
    });
  });
});
