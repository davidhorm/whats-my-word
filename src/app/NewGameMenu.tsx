import Typography from '@material-ui/core/Typography';
import { GenerateCode, NewGame } from './new-game-menu';
import './NewGameMenu.css';

export const NewGameMenu = () => (
  <>
    <Typography variant="h6" gutterBottom>
      What's My Word?
    </Typography>

    <NewGame />
    <GenerateCode />
  </>
);
