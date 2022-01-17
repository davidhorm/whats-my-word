import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { useState } from 'react';

type NewGameProps = { setWordLength: Function };
export const NewGame = ({ setWordLength }: NewGameProps) => {
  const [code, setCode] = useState('');

  return (
    <Paper elevation={5}>
      <Typography>Enter code to start new game:</Typography>
      <TextField label={'Code'} value={code} onChange={(e) => setCode(e.target.value)} />
      <Button
        variant="contained"
        color="primary"
        startIcon={<SportsEsportsIcon />}
        size="large"
        onClick={() => setWordLength(0)}
      >
        New Game
      </Button>
      <Typography>Or play random word:</Typography>
      <Button variant="contained" onClick={() => setWordLength(0)}>
        6-letter word
      </Button>
      <Button variant="contained" onClick={() => setWordLength(0)}>
        7-letter word
      </Button>
    </Paper>
  );
};

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