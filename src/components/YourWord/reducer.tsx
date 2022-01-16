import { getGuessWordScore } from './services/guess-word-scorer.service';

const stages = [
  'Your Word',
  'Their Guess 1',
  'Their Guess 2',
  'Their Guess 3',
  'Their Guess 4',
  'Their Guess 5',
  'Their Guess 6',
  'Their Guess 7',
  'Their Guess 8',
  'Their Guess 9',
  'Their Guess 10',
  'Their Guess 11',
  'END',
];

export const initialState = {
  currentStage: stages[0],
  actualWord: '',
  guessWords: [] as string[],
  guessWordScores: [] as number[],
};

export const getStageIndex = (stage: string) => stages.indexOf(stage);

type Actions = { type: 'SET_WORD'; word: string };

export const reducer = (state: typeof initialState, action: Actions): typeof initialState => {
  const currentStageIndex = getStageIndex(state.currentStage);
  if (action.type === 'SET_WORD' && currentStageIndex === 0) {
    return {
      ...state,
      actualWord: action.word,
      currentStage: stages[currentStageIndex + 1],
    };
  }

  if (action.type === 'SET_WORD') {
    const guessWordScore = getGuessWordScore(currentStageIndex - 1, action.word, state.actualWord);
    return {
      ...state,
      guessWords: [...state.guessWords, action.word],
      guessWordScores: [...state.guessWordScores, guessWordScore],
      currentStage: stages[currentStageIndex + 1],
    };
  }

  return state;
};
