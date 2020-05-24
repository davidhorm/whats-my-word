import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';
import { useEvent } from './use-event.effect';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      position: 'relative',
      right: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

const propTypes = {
  /** The current action to label the button with. */
  action: PropTypes.string.isRequired,

  /** Dispatch actions when the word is confirmed. */
  dispatch: PropTypes.func.isRequired,

  /** Text Field type. */
  textFieldType: PropTypes.shape({
    /** Type of the Text Field: text | number */
    type: PropTypes.string.isRequired,

    /** Max length of the string for type="text". */
    maxLength: PropTypes.number,
  }).isRequired,
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <ActionButton /> draws the floating action button for the user to perform the main interaction.
 * Clicking on the button will display an input modal to either either a word, or score.
 *
 * @returns {object} - I don't know yet.
 */
const ActionButton: React.FC<props> = ({ action, dispatch, textFieldType }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const color = 'primary';
  const theme = useTheme();
  const classes = useStyles();
  const inValue = true; // value === index. When Tab index equals fab index?
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  // Scroll to the dialog input when mobile keyboard resizes the window
  // const [hasFocus, setHasFocus] = React.useState(false);
  // const [hasResize, setHasResize] = React.useState(false);
  // useEvent('resize', () => setHasResize(true));
  // React.useEffect(() => {
  //   if (hasFocus && hasResize) {
  //     // try with timeout?
  //     document?.activeElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //     setHasFocus(false);
  //     setHasResize(false);
  //   }
  // }, [hasFocus, hasResize]);

  // Scroll to the dialog input when mobile keyboard resizes the window
  useEvent('resize', () =>
    setTimeout(() => document?.activeElement?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 500)
  );

  const inputElement = React.useRef<HTMLInputElement>(null);

  const WordInput = () => (
    <TextField
      id="word"
      inputRef={inputElement}
      margin="dense"
      autoComplete="off"
      autoFocus
      fullWidth
      error={errorMessage.length > 0}
      helperText={errorMessage || `Word Length: ${textFieldType.maxLength} letters`}
      label={action}
      type={textFieldType.type}
      inputProps={{
        pattern: '^[A-Za-z]+',
        minLength: textFieldType.maxLength,
        maxLength: textFieldType.maxLength,
      }}
    />
  );

  const ScoreInput = () => (
    <TextField
      id="score"
      inputRef={inputElement}
      margin="dense"
      autoComplete="off"
      autoFocus
      fullWidth
      error={errorMessage.length > 0}
      helperText={errorMessage}
      label={action}
      type={textFieldType.type}
      inputProps={{
        maxLength: 4,
        inputmode: 'numeric',
        pattern: '[0-9]*',
        min: 0,
        max: 9750,
        step: 250,
      }}
    />
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputElement.current) {
      return;
    }

    const { validity, value } = inputElement.current;

    // Text errors
    validity.patternMismatch && setErrorMessage('Only letters allowed.');
    validity.tooShort && setErrorMessage(`Word needs to be ${textFieldType.maxLength} letters.`);

    // Number errors
    validity.rangeOverflow && setErrorMessage('No way you scored that high.');
    validity.rangeUnderflow && setErrorMessage('No way you scored that low.');
    validity.stepMismatch && setErrorMessage('Scores are increments of 250.');

    if (validity.valid) {
      textFieldType.type === 'text'
        ? dispatch({ type: 'SET_WORD', word: value.toUpperCase() })
        : dispatch({ type: 'SET_SCORE', score: Number.parseInt(value, 10) });
      setOpenDialog(false);
      setErrorMessage('');
    }
  };

  return (
    <>
      {action !== 'END' && (
        <Zoom
          key={color}
          in={inValue}
          timeout={transitionDuration}
          style={{ transitionDelay: `${inValue ? transitionDuration.exit : 0}ms` }}
          unmountOnExit
        >
          <Fab
            variant="extended"
            aria-label={`+ ${action}`}
            color={color}
            className={classes.fab}
            onClick={() => setOpenDialog(true)}
          >
            <AddIcon className={classes.extendedIcon} /> {action}
          </Fab>
        </Zoom>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add {action}</DialogTitle>
        <form noValidate onSubmit={handleSubmit}>
          <DialogContent>{textFieldType.type === 'text' ? <WordInput /> : <ScoreInput />}</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              OK
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

ActionButton.propTypes = propTypes;

export { ActionButton };
