import Button from '@material-ui/core/Button';
import { ReactComponent as ShareSvg } from '../../components/icons/share.svg';
import type { GameWordCode } from '../../domain/game-word-service';
import type { ClientGameState } from '../../use-cases/use-game-state';

type Props = { code: GameWordCode } & Pick<ClientGameState, 'emojiResults' | 'totalScore'>;
export const SocialShareButton = ({ emojiResults, totalScore, code }: Props) => {
  const challengeText = window.history.length > 1 ? ' Can you beat that?!' : '';
  const firstLine = `I scored ${totalScore.toLocaleString()} (code: ${code})!${challengeText}`;
  const text = `${firstLine}\n${emojiResults}\n${window.location.href}`;

  return emojiResults ? (
    <Button
      variant="contained"
      color="primary"
      startIcon={<ShareSvg />}
      onClick={async () =>
        navigator.share({
          text,
        })
      }
    >
      Share
    </Button>
  ) : null;
};
