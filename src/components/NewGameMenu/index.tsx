import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import YouTubeIcon from '@material-ui/icons/YouTube';
import React from 'react';
import './index.css';

type Props = { setWordLength: Function };
const NewGameMenu = ({ setWordLength }: Props) => {
  const slider = React.useRef<HTMLElement>(null);
  return (
    <Paper className="container">
      <Typography variant="h3" gutterBottom>
        What's My Word?
      </Typography>
      <Typography id="letter-slider" gutterBottom>
        Guess Word Letter Length
      </Typography>
      <Slider
        className="slider"
        defaultValue={6}
        getAriaValueText={(value: number) => `${value}-letter word`}
        aria-labelledby="letter-slider"
        valueLabelDisplay="on"
        marks
        min={5}
        max={9}
        ref={slider}
      />

      <Button
        className="button"
        variant="contained"
        color="primary"
        startIcon={<SportsEsportsIcon />}
        size="large"
        onClick={() => setWordLength(Number.parseInt(slider.current?.querySelector('input')?.value || '0', 10))}
      >
        New Game
      </Button>
      <hr />
      <Button
        className="button"
        variant="contained"
        color="default"
        startIcon={<YouTubeIcon />}
        href="https://www.youtube.com/watch?v=CKpNrJ30-0M"
        target="_blank"
      >
        How to Play
      </Button>
    </Paper>
  );
};

export { NewGameMenu };
