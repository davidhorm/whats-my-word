import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { FormEventHandler, useState } from 'react';
import { useInitGameState } from '../../use-cases/use-init-game-state';
import { useGameWordValidation } from '../../use-cases/use-word-validation';
import { CodeActions } from './generate-code/CodeActions';
import { GenerateRandomCode } from './generate-code/GenerateRandomCode';

export const GenerateCode = () => {
  const { GenerateGameWordCode } = useInitGameState;
  const { state, setWord, setTouched } = useGameWordValidation();
  const [code, setCode] = useState('');

  const handleGenerateCode: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setTouched();
    if (state.isValid) {
      const newCode = GenerateGameWordCode(state.word);
      setCode(newCode);
    }
  };

  return (
    <Paper elevation={4} className="flex w-full flex-col gap-1 p-4">
      <Typography>Generate a code for your friend.</Typography>
      <form className="flex w-full flex-col gap-1" onSubmit={handleGenerateCode}>
        <TextField
          label="6 or 7 letter word"
          size="small"
          autoComplete="off"
          variant="outlined"
          value={state.word}
          onChange={(e) => setWord(e.target.value)}
          onBlur={() => setTouched()}
          error={state.isTouched && !state.isValid}
          helperText={state.isTouched && !state.isValid && 'Word must valid and be between 6-7 letters'}
        />
        <Button variant="contained" type="submit" disabled={!state.isValid}>
          Generate Code
        </Button>
      </form>
      <CodeActions code={code} />

      <GenerateRandomCode setCode={setCode} />
    </Paper>
  );
};
