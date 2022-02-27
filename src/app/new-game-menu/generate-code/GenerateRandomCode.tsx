import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Dispatch, SetStateAction } from 'react';
import { useInitGameState } from '../../../use-cases/use-init-game-state';

type Props = { setCode: Dispatch<SetStateAction<string>> };

export const GenerateRandomCode = ({ setCode }: Props) => {
  const { GenerateRandomGameWordCode } = useInitGameState;

  return (
    <Accordion className="mt-4">
      <AccordionSummary expandIcon="+" aria-controls="panel1a-content" id="panel1a-header">
        <Typography>Or generate random code:</Typography>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col gap-1">
        <Button variant="contained" onClick={() => setCode(GenerateRandomGameWordCode(6))} fullWidth>
          6-letter word
        </Button>
        <Button variant="contained" onClick={() => setCode(GenerateRandomGameWordCode(7))} fullWidth>
          7-letter word
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};
