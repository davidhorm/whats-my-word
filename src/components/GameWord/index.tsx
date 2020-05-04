import PropTypes from 'prop-types';
import React from 'react';
import { getActualLetterGridAreaName } from '../../services/grid-template.service';

const propTypes = {
  /** The Actual Word. */
  actualWord: PropTypes.string,
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <GameWord /> displays either the Actual Word for Your Word, or controls to guess Their Word.
 *
 * @returns {object} - a bunch of <span> tags
 */
const GameWord: React.FC<props> = ({ actualWord }) => {
  const actualLetters = actualWord?.split('');

  return (
    <>
      {actualLetters?.map((actualLetter, actualLetterIndex) => (
        <span style={{ gridArea: getActualLetterGridAreaName(actualLetterIndex) }}>{actualLetter}</span>
      ))}
    </>
  );
};

GameWord.propTypes = propTypes;

export { GameWord };
