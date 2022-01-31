import { ChangeEventHandler, InputHTMLAttributes, KeyboardEventHandler, useState } from 'react';

// 9-boxes
const size = '7.5vw';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  amount?: number;
  inputProps?: InputHTMLAttributes<HTMLInputElement>[];
  pattern?: string;
  password?: boolean;
  onChange?: (word: string) => void;
};

export const IndividualCharacterInputs = ({
  amount = 5,
  inputProps = [],
  pattern = '^[a-zA-Z]{1}$',
  password = false,
  onChange = () => {},
  value,
}: Props) => {
  const initialCharacterArray =
    typeof value === 'string' && !!value ? value.toUpperCase().split('') : Array.from({ length: amount }, () => '');
  const [characterArray, setCharacterArray] = useState(initialCharacterArray);

  const changeFocus = (direction: 'next' | 'previous', target: HTMLInputElement) => {
    const sibling = target?.[`${direction}ElementSibling`] as HTMLInputElement;
    typeof sibling?.focus === 'function' && sibling.focus();
  };

  const handleCharacterChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const charIndex = parseInt(target.name.replace('input', ''), 10);

    if (new RegExp(pattern).test(target.value) || target.value === '') {
      characterArray.splice(charIndex, 1, target.value);
      setCharacterArray(characterArray);

      onChange(characterArray.join(''));

      !!target.value && changeFocus('next', target);
    } else {
      target.value = characterArray[charIndex];
    }
  };

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = ({ target, key }) => {
    const inputElement = target as HTMLInputElement;

    const keyActionMap: Record<typeof key, Function> = {
      Backspace: () => !inputElement.value && changeFocus('previous', inputElement),
      ArrowLeft: () => changeFocus('previous', inputElement),
      ArrowRight: () => changeFocus('next', inputElement),
    };

    keyActionMap[key] && keyActionMap[key]();
  };

  return (
    <>
      {characterArray.map((char, index) => {
        const valueProps = !!value ? { value: char, disabled: true } : {};

        return (
          <input
            type={password ? 'password' : 'text'}
            key={index}
            onKeyUp={handleKeyUp}
            onChange={handleCharacterChange}
            name={'input' + index}
            pattern={pattern}
            maxLength={1}
            style={{ width: size, height: size }}
            {...valueProps}
            {...inputProps[index]}
          />
        );
      })}
    </>
  );
};
