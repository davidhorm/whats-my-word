import { action } from '@storybook/addon-actions';
import type { ComponentStory } from '@storybook/react';
import { IndividualCharacterInputs } from '.';

export default {
  title: IndividualCharacterInputs.name,
  component: IndividualCharacterInputs,
};

const handleChange = (word: string) => action(word);

const Template: ComponentStory<typeof IndividualCharacterInputs> = (props) => <IndividualCharacterInputs {...props} />;
export const Default = Template.bind({});
Default.args = {
  onChange: handleChange,
};

export const NineBoxes = () => <IndividualCharacterInputs amount={9} onChange={handleChange} />;

export const PrePopulated = () => <IndividualCharacterInputs value="answer" onChange={handleChange} />;
