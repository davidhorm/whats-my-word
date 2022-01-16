import PropTypes from 'prop-types';

const propTypes = {
  /** The Actual Word. */
  actualWord: PropTypes.string,
};

type Props = PropTypes.InferProps<typeof propTypes>;

/**
 * <GameWord /> displays either the Actual Word for Your Word, or controls to guess Their Word.
 *
 * @returns {object} - a bunch of <span> tags
 */
const GameWord = ({ actualWord }: Props) => {
  const actualLetters = actualWord?.split('');

  return (
    <tr>
      {actualLetters?.map((actualLetter, actualLetterIndex) => (
        <td key={`actual-${actualLetterIndex}`}>{actualLetter}</td>
      ))}
    </tr>
  );
};

GameWord.propTypes = propTypes;

export { GameWord };
