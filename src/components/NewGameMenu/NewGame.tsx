import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

type NewGameProps = { setWordLength: Function };
export const NewGame = ({ setWordLength }: NewGameProps) => (
  <Paper>
    <Button
      className="button"
      variant="contained"
      color="primary"
      startIcon={<SportsEsportsIcon />}
      size="large"
      onClick={() => setWordLength(0)}
    >
      New Game
    </Button>
  </Paper>
);

/* <hr />
       <Button
        className="button"
        variant="contained"
        color="default"
        startIcon={<YouTubeIcon />}
        href="https://www.youtube.com/watch?v=CKpNrJ30-0M"
        target="_blank"
      >
        How to Play
      </Button> */
