import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useGameState } from './use-game-state';

describe(useGameState.name, () => {
  const defaultGameState = {
    bonusPoints: 0,
    rounds: [],
    totalScore: 0,
  };

  const TestGameState = ({ code }: any) => {
    const {
      clientGameState: { rounds, bonusPoints, totalScore, submitGuessWord },
    } = useGameState({ code });
    return <div>
      <code id="clientGameState">{JSON.stringify({ rounds, bonusPoints, totalScore })}</code>;
      <label htmlFor="guess-word">Guess Word:</label>
      <input id="guess-word" type="text" />
      <button onClick={() => submitGuessWord && submitGuessWord((document.querySelector('#guess-word') as HTMLInputElement).value)}>Submit</button>
    </div>
  };

  it('should render the guesses for "nephew" with bonus points', () => {
    const { container } = render(<TestGameState code="HIR" />);
    const jsonText = container.querySelector('#clientGameState')?.innerHTML || '{}';
    const jsonObject = JSON.parse(jsonText);
    expect(jsonObject).toEqual(defaultGameState);

    const guessWords = ['so', 'den', 'ebb', 'inn', 'bid', 'turn', 'earl', 'newt', 'newel', 'endow', 'nephew'];

    const finalGuessLetters = [
      ['s', 'o', '', '', '', '', 0],
      ['d', 'e', 'n', '', '', '', 1250],
      ['', 'e', 'b', 'b', '', '', 1000],
      ['', '', 'i', 'n', 'n', '', 250],
      ['', '', '', 'b', 'i', 'd', 0],
      ['', '', 't', 'u', 'r', 'n', 250],
      ['', 'e', 'a', 'r', 'l', '', 1000],
      ['n', 'e', 'w', 't', '', '', 2250],
      ['n', 'e', 'w', 'e', 'l', '', 2500],
      ['', 'e', 'n', 'd', 'o', 'w', 2250],
      ['n', 'e', 'p', 'h', 'e', 'w', 6000],
    ];

    const totalScores = [
      0,
      1250,
      2250,
      2500,
      2500,
      2750,
      3750,
      6000,
      8500,
      10750,
      16750 + 3000,
    ];

    guessWords.forEach((guessWord, index) => {
      const textbox = screen.getByLabelText('Guess Word:');
      userEvent.clear(textbox);
      userEvent.type(textbox, guessWord);

      const button = screen.getByText('Submit');
      userEvent.click(button);

      const jsonText = container.querySelector('#clientGameState')?.innerHTML || '{}';
      const jsonObject = JSON.parse(jsonText);
      expect(jsonObject).toEqual({
        rounds: finalGuessLetters.slice(0, index + 1),
        totalScore: totalScores[index],
        bonusPoints: index === 10 ? 3000 : 0
      });
    });
  });

  it('should render the guesses for "ballet" without bonus points', () => {
    const { container } = render(<TestGameState code="YND" />);
    const jsonText = container.querySelector('#clientGameState')?.innerHTML || '{}';
    const jsonObject = JSON.parse(jsonText);
    expect(jsonObject).toEqual(defaultGameState);

    const guessWords = ['an', 'car', 'act', 'toe', 'old', 'toot', 'dull', 'mail', 'falls', 'alter', 'wallet',];

    const finalGuessLetters = [
      ['a', 'n', '', '', '', '', 250],
      ['c', 'a', 'r', '', '', '', 1000],
      ['', 'a', 'c', 't', '', '', 1250],
      ['', '', 't', 'o', 'e', '', 1250],
      ['', '', '', 'o', 'l', 'd', 250],
      ['', '', 't', 'o', 'o', 't', 1000],
      ['', 'd', 'u', 'l', 'l', '', 1250],
      ['m', 'a', 'i', 'l', '', '', 2000],
      ['f', 'a', 'l', 'l', 's', '', 3000],
      ['', 'a', 'l', 't', 'e', 'r', 3250],
      ['w', 'a', 'l', 'l', 'e', 't', 5000],
    ];

    const totalScores = [
      250,
      1250,
      2500,
      3750,
      4000,
      5000,
      6250,
      8250,
      11250,
      14500,
      19500,
    ];

    guessWords.forEach((guessWord, index) => {
      const textbox = screen.getByLabelText('Guess Word:');
      userEvent.clear(textbox);
      userEvent.type(textbox, guessWord);

      const button = screen.getByText('Submit');
      userEvent.click(button);

      const jsonText = container.querySelector('#clientGameState')?.innerHTML || '{}';
      const jsonObject = JSON.parse(jsonText);
      expect(jsonObject).toEqual({
        rounds: finalGuessLetters.slice(0, index + 1),
        totalScore: totalScores[index],
        bonusPoints: 0
      });
    });
  });
});
