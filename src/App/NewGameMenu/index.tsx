import Typography from '@material-ui/core/Typography';
import { GenerateCode } from './GenerateCode';
import './index.css';
import { NewGame } from './NewGame';

export const NewGameMenu = () => (
  <>
    <Typography variant="h6" gutterBottom>
      What's My Word?
    </Typography>

    <NewGame />
    <GenerateCode />
  </>
);
