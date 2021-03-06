import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { YourWord } from '.';

describe('<YourWord />', () => {
  describe('GIVEN a blank 6-letter word game', () => {
    beforeEach(() => {
      render(<YourWord actualWordLength={6} />);
    });

    it('should render an initial button', () => {
      const button = screen.getByLabelText('+ Your Word');
      expect(button).toBeInTheDocument();
    });

    test('WHEN the user enters a perfect guesses › THEN it should give perfect scores.', () => {
      const addButton = screen.getByLabelText('+ Your Word');
      fireEvent.click(addButton);

      const input = screen.getByRole('textbox', { name: 'Your Word' });
      fireEvent.change(input, { target: { value: 'abcdef' } });

      const okButton = screen.getByRole('button', { name: 'OK' });
      fireEvent.click(okButton);

      expect(screen.queryByText('g')).not.toBeInTheDocument();
      expect(screen.queryByText('a')).toBeInTheDocument();

      // TODO: finish writing tests.
    });
  });
});
