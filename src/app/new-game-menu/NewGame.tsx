import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlaySvg } from '../../components/icons';
import { useInitGameState } from '../../use-cases/use-init-game-state';

export const NewGame = () => {
  const { GetGameWordCodeValidationRule } = useInitGameState;
  const [code, setCode] = useState('');

  return (
    <Paper elevation={5} className="w-full p-4">
      <Typography>Enter code to start new game:</Typography>
      <div className="mt-1 flex flex-row gap-1">
        <TextField
          label="Code"
          size="small"
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoComplete="off"
          fullWidth
          {...GetGameWordCodeValidationRule}
        />
        <Button
          className="w-40 whitespace-nowrap"
          variant="contained"
          color="primary"
          startIcon={<PlaySvg />}
          size="small"
          component={Link}
          to={code}
        >
          New Game
        </Button>
      </div>
    </Paper>
  );
};
