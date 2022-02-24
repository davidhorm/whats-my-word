import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInitGameState } from '../../use-cases/use-init-game-state';
import { PlaySvg } from './GenerateCode/CodeActions/PlaySvg';

export const NewGame = () => {
  const { GetGameWordCodeValidationRule } = useInitGameState;
  const [code, setCode] = useState('');

  return (
    <Paper elevation={5}>
      <Typography>Enter code to start new game:</Typography>
      <TextField
        label="Code"
        size="small"
        variant="outlined"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        autoComplete="off"
        {...GetGameWordCodeValidationRule}
      />
      <Button variant="contained" color="primary" startIcon={<PlaySvg />} size="large" component={Link} to={code}>
        New Game
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
