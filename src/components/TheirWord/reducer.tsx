const stages = [
  'Your Guess 1',
  'Your Score 1',
  'Your Guess 2',
  'Your Score 2',
  'Your Guess 3',
  'Your Score 3',
  'Your Guess 4',
  'Your Score 4',
  'Your Guess 5',
  'Your Score 5',
  'Your Guess 6',
  'Your Score 6',
  'Your Guess 7',
  'Your Score 7',
  'Your Guess 8',
  'Your Score 8',
  'Your Guess 9',
  'Your Score 9',
  'Your Guess 10',
  'Your Score 10',
  'Your Guess 11',
  'Your Score 11',
  'END',
];

export const initialState = {
  currentStage: stages[0],
  actualWord: '',
  guessWords: [] as string[],
  guessWordScores: [] as number[],
};

export const getStageIndex = (stage: string) => stages.indexOf(stage);

type Actions = { type: 'SET_WORD'; word: string } | { type: 'SET_SCORE'; score: number };

export const reducer = (state: typeof initialState, action: Actions): typeof initialState => {
  const currentStageIndex = getStageIndex(state.currentStage);
  if (action.type === 'SET_WORD') {
    return {
      ...state,
      guessWords: [...state.guessWords, action.word],
      currentStage: stages[currentStageIndex + 1],
    };
  }

  if (action.type === 'SET_SCORE') {
    return {
      ...state,
      guessWordScores: [...state.guessWordScores, action.score],
      currentStage: stages[currentStageIndex + 1],
    };
  }

  return state;
};
