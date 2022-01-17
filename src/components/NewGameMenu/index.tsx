import Typography from '@material-ui/core/Typography';
import type { Dispatch, SetStateAction } from 'react';
import { GenerateCode } from './GenerateCode';
import './index.css';
import { NewGame } from './NewGame';

type NewGameMenuProps = { setGameCode: Dispatch<SetStateAction<string>> };
const NewGameMenu = ({ setGameCode }: NewGameMenuProps) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        What's My Word?
      </Typography>

      <NewGame setGameCode={setGameCode} />
      <GenerateCode />
    </>
  );
};

export { NewGameMenu };
