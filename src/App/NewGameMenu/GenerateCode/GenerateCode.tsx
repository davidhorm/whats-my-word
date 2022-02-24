import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useInitGameState } from '../../../use-cases/use-init-game-state';
import { CodeActions } from './CodeActions';

export const GenerateCode = () => {
  const { GenerateGameWordCode, GetGameWordValidationRule, GenerateRandomGameWordCode } = useInitGameState;
  const [word, setWord] = useState('');
  const [code, setCode] = useState('');

  const handleGenerateCode = () => {
    const newCode = GenerateGameWordCode(word);
    setCode(newCode);
  };

  return (
    <Paper elevation={4}>
      <Typography>Generate a code for your friend.</Typography>
      <TextField
        label="6 or 7 letter word"
        size="small"
        {...GetGameWordValidationRule}
        value={word}
        variant="outlined"
        onChange={(e) => setWord(e.target.value)}
      />
      <Button variant="contained" onClick={handleGenerateCode}>
        Generate Code
      </Button>
      <Typography>Or generate random code:</Typography>
      <Button variant="contained" onClick={() => setCode(GenerateRandomGameWordCode(6))}>
        6-letter word
      </Button>
      <Button variant="contained" onClick={() => setCode(GenerateRandomGameWordCode(7))}>
        7-letter word
      </Button>
      <CodeActions code={code} />
    </Paper>
  );
};
