import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      position: 'absolute',
      bottom: theme.spacing(2),
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
};

type props = PropTypes.InferProps<typeof propTypes>;

/**
 * <ActionButton /> draws the floating action button for the user to perform the main interaction.
 * Clicking on the button will display an input modal to either either a word, or score.
 *
 * @returns {object} - I don't know yet.
 */
const ActionButton: React.FC<props> = ({ action }) => {
  const color = 'primary';
  const theme = useTheme();
  const classes = useStyles();
  const inValue = true; // value === index. When Tab index equals fab index?
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  return (
    <Zoom
      key={color}
      in={inValue}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${inValue ? transitionDuration.exit : 0}ms`,
      }}
      unmountOnExit
    >
      <Fab variant="extended" aria-label={`+ ${action}`} color={color} className={classes.fab}>
        <AddIcon className={classes.extendedIcon} /> {action}
      </Fab>
    </Zoom>
  );
};

ActionButton.propTypes = propTypes;

export { ActionButton };
