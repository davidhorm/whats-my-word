import { useReducer } from 'react';
import { TransformToGameWord, type GameWordCode, type GameWordLength, type ValidGameWord } from '../domain/game-word-service';
import { CalculateGuessResult, GetValidationRule, ParseGuessLetters, type GameRoundNumber, type GuessWordScore, type ValidGuessWord } from '../domain/guess-word-service';

type GameRound = {
  number: GameRoundNumber;
  guessWord: ValidGuessWord;
  score: GuessWordScore;
  bonusPoints?: number;
};

export type GameState = {
  gameWord: ValidGameWord;
  currentRound: GameRoundNumber;
  isGameOver: boolean;
  gameRounds: GameRound[];
};

const buildInitialGameState = (gameWord: ValidGameWord): GameState => ({
  gameWord,
  currentRound: 0,
  isGameOver: false,
  gameRounds: [],
});

type GameActions = { type: 'SET_GUESS_RESULTS'; guessWord: ValidGuessWord; guessResults: GuessWordScore };

const reducer = (state: GameState, action: GameActions): GameState => {
  switch (action.type) {
    case 'SET_GUESS_RESULTS':
      return {
        ...state,
        currentRound: (state.currentRound + 1) as GameRoundNumber,
        isGameOver: state.currentRound === 10,
        gameRounds: state.gameRounds.concat({
          number: state.currentRound,
          guessWord: action.guessWord,
          score: action.guessResults,
          bonusPoints: action.guessResults.matchingLetters === state.gameWord.length ? 3000 : 0,
        }),
      };
    default:
      return state;
  }
};

const calculateBonusPoints = (state: GameState) =>
  state.isGameOver && state.gameRounds[10].score.matchingLetters === state.gameWord.length ? 3000 : 0;

type UseGameStateProps = { code: GameWordCode };
export const useGameState = ({ code }: UseGameStateProps) => {
  const gameWord = TransformToGameWord(code);
  const [state, dispatch] = useReducer(reducer, buildInitialGameState(gameWord));

  const submitGuessWord = (guessWord: ValidGuessWord) => {
    const guessResults = CalculateGuessResult(state.gameWord, guessWord, state.currentRound);
    dispatch({ type: 'SET_GUESS_RESULTS', guessWord, guessResults });
  };

  /** Get the Game State meant to display on the client. */
  const clientGameState = {
    rounds: state.gameRounds.map((gameRound) =>
      ParseGuessLetters(state.gameWord.length as GameWordLength, gameRound.guessWord, gameRound.number).concat(
        gameRound.score.score
      )
    ),
    bonusPoints: calculateBonusPoints(state),
    totalScore: state.gameRounds.reduce(
      (previousValue, currentValue) => previousValue + currentValue.score.score,
      calculateBonusPoints(state)
    ),
    validationRule: !state.isGameOver && GetValidationRule(state.gameWord.length as GameWordLength, state.currentRound),
    submitGuessWord: !state.isGameOver && submitGuessWord,
  };

  return { clientGameState };
};
