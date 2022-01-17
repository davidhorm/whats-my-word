import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { GuessWordGrid } from '.';

export default {
  title: 'GuessWordGrid',
  component: GuessWordGrid,
} as ComponentMeta<typeof GuessWordGrid>;

const Template: ComponentStory<typeof GuessWordGrid> = (args) => <GuessWordGrid {...args} />;
export const Default = Template.bind({});
Default.args = {
  gameWordLength: 6,
};
