import Button from '@material-ui/core/Button';
import { ShareSvg } from '../../components/icons';
import type { ClientGameState } from '../../use-cases/use-game-state';

type Props = Pick<ClientGameState, 'emojiResults' | 'totalScore'>;
export const SocialShareButton = ({ emojiResults, totalScore }: Props) =>
  emojiResults ? (
    <Button
      variant="contained"
      color="primary"
      startIcon={<ShareSvg />}
      onClick={async () =>
        navigator.share({
          title: "What's My Word?",
          text: `Can you beat my score of ${totalScore}?!\n\n${emojiResults}`,
          url: window.location.href,
        })
      }
    >
      Share
    </Button>
  ) : null;
