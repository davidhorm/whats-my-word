import { useReducer } from 'react';
import {
  TransformToGameWord,
  type GameWordCode,
  type GameWordLength,
  type ValidGameWord,
} from '../domain/game-word-service';
import {
  CalculateGuessResult,
  GetValidationRule,
  ParseGuessLetters,
  type GameRoundNumber,
  type GuessWordScore,
  type ValidGuessWord,
} from '../domain/guess-word-service';

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
  const reducerMap: Record<typeof action.type, GameState> = {
    SET_GUESS_RESULTS: {
      ...state,
      currentRound: (state.currentRound + 1) as GameRoundNumber,
      isGameOver: state.currentRound === 10,
      gameRounds: state.gameRounds.concat({
        number: state.currentRound,
        guessWord: action.guessWord,
        score: action.guessResults,
        bonusPoints: action.guessResults.matchingLetters === state.gameWord.length ? 3000 : 0,
      }),
    },
  };

  return reducerMap[action.type] || state;
};

const calculateBonusPoints = (state: GameState) =>
  state.isGameOver && state.gameRounds[10].score.matchingLetters === state.gameWord.length ? 3000 : 0;

export type ClientGameRound = {
  letters: string[];
  score: GuessWordScore;
};

export type ClientGameState = {
  gameWordLength: GameWordLength;
  gameWordRevealed: string;
  rounds: ClientGameRound[];
  bonusPoints: number;
  totalScore: number;
  validationRule?: ReturnType<typeof GetValidationRule>;
  submitGuessWord?: (guessWord: ValidGuessWord) => void;
};

type UseGameStateProps = { code: GameWordCode };
export const useGameState = ({ code }: UseGameStateProps) => {
  const gameWord = TransformToGameWord(code);
  const [state, dispatch] = useReducer(reducer, buildInitialGameState(gameWord));

  const submitGuessWord = (guessWord: ValidGuessWord) => {
    const guessResults = CalculateGuessResult(state.gameWord, guessWord, state.currentRound);
    dispatch({ type: 'SET_GUESS_RESULTS', guessWord, guessResults });
  };

  /** Get the Game State meant to display on the client. */
  const clientGameState: ClientGameState = {
    gameWordLength: state.gameWord.length as GameWordLength,
    gameWordRevealed: state.isGameOver ? state.gameWord : '',
    rounds: state.gameRounds.map((gameRound) => ({
      letters: ParseGuessLetters(state.gameWord.length as GameWordLength, gameRound.guessWord, gameRound.number),
      score: gameRound.score,
    })),
    bonusPoints: calculateBonusPoints(state),
    totalScore: state.gameRounds.reduce(
      (previousValue, currentValue) => previousValue + currentValue.score.score,
      calculateBonusPoints(state)
    ),
    validationRule: !state.isGameOver
      ? GetValidationRule(state.gameWord.length as GameWordLength, state.currentRound)
      : undefined,
    submitGuessWord: !state.isGameOver ? submitGuessWord : undefined,
  };

  return { clientGameState };
};
