import Typography from '@material-ui/core/Typography';
import { GenerateCode } from './GenerateCode';
import './index.css';
import { NewGame } from './NewGame';

type NewGameMenuProps = { setWordLength: Function };
const NewGameMenu = ({ setWordLength }: NewGameMenuProps) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        What's My Word?
      </Typography>

      <NewGame setWordLength={setWordLength} />
      <GenerateCode />
    </>
  );
};

export { NewGameMenu };
