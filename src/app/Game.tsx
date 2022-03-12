import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as LeftArrowSvg } from '../components/icons/left-arrow.svg';
import { useGameState } from '../use-cases/use-game-state';
import { GuessWordGrid } from './game/GuessWordGrid';
import { SocialShareButton } from './game/SocialShareButton';
import { NewGameMenu } from './NewGameMenu';

export const Game = () => {
  const { code } = useParams();
  const { clientGameState } = useGameState({ code });
  const navigate = useNavigate();

  useEffect(() => {
    // Focus on next row of inputs after guess submitted
    const rowIndex = clientGameState.rounds.length;
    const cellId = `round-${rowIndex}-letter-0`;
    document.getElementById(cellId)?.focus();
  }, [clientGameState]);

  if (!code || !clientGameState.isGameStateValid)
    return (
      <div>
        <span className="font-mono">{code}</span> is an invalid code.
        <NewGameMenu />
      </div>
    );

  return (
    <main className="mt-4 flex flex-col items-center gap-4">
      <GuessWordGrid {...clientGameState} code={code!} variant="CORRECTNESS" />
      <SocialShareButton
        code={code}
        emojiResults={clientGameState.emojiResults}
        totalScore={clientGameState.totalScore}
      />
      <Button variant="outlined" startIcon={<LeftArrowSvg />} onClick={() => navigate('/')}>
        Main Menu
      </Button>
    </main>
  );
};
