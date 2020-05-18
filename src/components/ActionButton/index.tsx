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
  const [word, setWord] = React.useState('');
  const [wordLengthError, setWordLengthError] = React.useState(true);
  const [score, setScore] = React.useState(0);

  const color = 'primary';
  const theme = useTheme();
  const classes = useStyles();
  const inValue = true; // value === index. When Tab index equals fab index?
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  // Scroll to the dialog input when mobile keyboard resizes the window
  const [hasFocus, setHasFocus] = React.useState(false);
  const [hasResize, setHasResize] = React.useState(false);
  useEvent('resize', () => setHasResize(true));
  React.useEffect(() => {
    if (hasFocus && hasResize) {
      document?.activeElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHasFocus(false);
      setHasResize(false);
    }
  }, [hasFocus, hasResize]);

  const handleConfirmDialog = () => {
    textFieldType.type === 'text' ? dispatch({ type: 'SET_WORD', word }) : dispatch({ type: 'SET_SCORE', score });
    setOpenDialog(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (textFieldType.type === 'text') {
      setWord(event.target.value.toUpperCase());
      setWordLengthError(event.target.value.length !== textFieldType.maxLength);
    } else if (textFieldType.type === 'number') {
      setScore(Number.parseInt(event.target.value, 10));
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
        <DialogContent>
          <TextField
            id="word"
            margin="dense"
            autoComplete="off"
            autoFocus
            fullWidth
            error={wordLengthError}
            label={action}
            type={textFieldType.type}
            inputProps={textFieldType.maxLength ? { maxLength: textFieldType.maxLength } : undefined}
            helperText={textFieldType.maxLength ? `Word Length ${textFieldType.maxLength}` : ''}
            onChange={onChange}
            onFocus={() => setHasFocus(true)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ActionButton.propTypes = propTypes;

export { ActionButton };
