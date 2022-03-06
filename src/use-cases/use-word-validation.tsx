import { useReducer } from 'react';
import twoLetterWords from '../wordList/2-letter-words.json';
import threeLetterWords from '../wordList/3-letter-words.json';
import fourLetterWords from '../wordList/4-letter-words.json';
import fiveLetterWords from '../wordList/5-letter-words.json';
import sixLetterWords from '../wordList/6-letter-words.json';
import sevenLetterWords from '../wordList/7-letter-words.json';

type WordLengths = 2 | 3 | 4 | 5 | 6 | 7;

type State = ReturnType<typeof initialState>;

type SetWordAction = { type: 'SET_WORD'; word: string };
type SetTouchedAction = { type: 'SET_TOUCHED' };
type Actions = SetWordAction | SetTouchedAction;

const initialState = (minWordLength: WordLengths, maxWordLength: WordLengths) => ({
  word: '',
  minWordLength,
  maxWordLength,
  isValid: false,
  isTouched: false,
});

const dictionary: Record<WordLengths, string[]> = {
  2: twoLetterWords,
  3: threeLetterWords,
  4: fourLetterWords,
  5: fiveLetterWords,
  6: sixLetterWords,
  7: sevenLetterWords,
};

const wordReducer = (state: State, action: Actions): State => {
  if (action.type === 'SET_WORD') {
    const lowerCaseWord = action.word.toLowerCase();
    const wordLength = lowerCaseWord.length;
    return {
      ...state,
      word: lowerCaseWord,
      isValid:
        state.minWordLength <= wordLength &&
        wordLength <= state.maxWordLength &&
        (dictionary[state.minWordLength].includes(lowerCaseWord) ||
          dictionary[state.maxWordLength].includes(lowerCaseWord)),
    };
  }

  if (action.type === 'SET_TOUCHED') {
    return {
      ...state,
      isTouched: true,
    };
  }

  return state;
};

const useWordValidation = (minWordLength: WordLengths, maxWordLength: WordLengths) => {
  const [state, setState] = useReducer(wordReducer, initialState(minWordLength, maxWordLength));

  const setWord = (word: string) => setState({ type: 'SET_WORD', word });
  const setTouched = () => setState({ type: 'SET_TOUCHED' });

  return { state, setWord, setTouched };
};

export const useGuessWordValidation = (wordLength: number) =>
  useWordValidation(wordLength as WordLengths, wordLength as WordLengths);
export const useGameWordValidation = () => useWordValidation(6, 7);
