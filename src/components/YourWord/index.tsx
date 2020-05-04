import PropTypes from 'prop-types';
import React from 'react';
import { getGridTemplateAreas } from '../../services/grid-template.service';
import { GameWord } from '../GameWord';
import { GuessWordRow } from '../GuessWordRow';

const propTypes = {
  /** The max length of the Actual Word. */
  actualWordLength: PropTypes.number.isRequired,
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <YourWord /> allows the user to view and manage their guesses of your actual word.
 *
 * @returns {object} - I don't know yet.
 */
const YourWord: React.FC<props> = ({ actualWordLength }) => {
  const gridStyle = {
    display: 'grid',
    columnGap: '1rem',
    gridTemplateColumns: '1rem',
    gridTemplateAreas: getGridTemplateAreas(actualWordLength),
  };

  const sampleGuessWords = ['by', 'now', 'are', 'sin', 'pus', 'hose', 'hair', 'chop', 'chops', 'house', 'choose'];

  return (
    <section style={gridStyle}>
      <GameWord actualWord="choose" />
      {sampleGuessWords.map((guessWord, rowIndex) => (
        <GuessWordRow rowIndex={rowIndex} guessWord={guessWord} />
      ))}
    </section>
  );
};

YourWord.propTypes = propTypes;

export { YourWord };
