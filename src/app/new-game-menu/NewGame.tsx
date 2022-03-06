import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { FormEventHandler, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PlaySvg } from '../../components/icons/play.svg';
import { useInitGameState } from '../../use-cases/use-init-game-state';

const initialState = {
  code: '',
  isValid: false,
  isTouched: false,
};

type SetCodeAction = { type: 'SET_CODE'; code: string };
type SetTouchedAction = { type: 'SET_TOUCHED' };
type Actions = SetCodeAction | SetTouchedAction;

const codeReducer = (state: typeof initialState, action: Actions): typeof initialState => {
  if (action.type === 'SET_CODE') {
    return {
      ...state,
      code: action.code.toUpperCase(),
      isValid: new RegExp(useInitGameState.GetGameWordCodeValidationRule.pattern!).test(action.code.toUpperCase()),
    };
  }

  if (action.type === 'SET_TOUCHED') {
    return {
      ...state,
      isTouched: true,
    };
  }

  return state;
};

export const NewGame = () => {
  const [state, setState] = useReducer(codeReducer, initialState);
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setState({ type: 'SET_TOUCHED' });
    state.isValid && navigate(state.code);
  };

  return (
    <Paper elevation={5} className="w-full p-4">
      <form onSubmit={handleSubmit}>
        <Typography>Enter code to start new game:</Typography>
        <div className="mt-1 flex flex-row gap-1">
          <TextField
            label="Code"
            size="small"
            variant="outlined"
            autoComplete="off"
            inputProps={{ className: 'uppercase' }}
            fullWidth
            value={state.code}
            onChange={(e) => setState({ type: 'SET_CODE', code: e.target.value })}
            onBlur={() => setState({ type: 'SET_TOUCHED' })}
            error={state.isTouched && !state.isValid}
            helperText={state.isTouched && !state.isValid && 'Code must be 3-4 letters'}
          />
          <Button
            className="h-10 w-40 whitespace-nowrap"
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<PlaySvg />}
            size="small"
            disabled={!state.isValid}
          >
            New Game
          </Button>
        </div>
      </form>
    </Paper>
  );
};
