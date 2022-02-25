import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { GuessWordGrid } from './GuessWordGrid';

export default {
  title: 'GuessWordGrid',
  component: GuessWordGrid,
} as ComponentMeta<typeof GuessWordGrid>;

const Template: ComponentStory<typeof GuessWordGrid> = (args) => <GuessWordGrid {...args} />;
export const Empty = Template.bind({});
Empty.args = {
  gameWordLength: 6,
};

const guessesForNephew = [
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

const scoresForNephew = [
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

const nephewGuesses = guessesForNephew.map((letters, index) => ({ letters, score: scoresForNephew[index] }));

export const NephewGuesses = Template.bind({});
NephewGuesses.args = {
  gameWordLength: 6,
  gameWordRevealed: 'nephew',
  rounds: nephewGuesses,
  bonusPoints: 3000,
  totalScore: 19750,
  variant: 'SCORE',
};
