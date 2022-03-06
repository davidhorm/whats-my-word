import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CopySvg } from '../../../components/icons/copy.svg';
import { ReactComponent as PlaySvg } from '../../../components/icons/play.svg';
import { ReactComponent as ShareSvg } from '../../../components/icons/share.svg';

type Props = { code?: string };
export const CodeActions = ({ code }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="mt-4 flex items-center justify-between">
      <span className={`font-mono ${!code && 'opacity-25'}`}>CODE: {code}</span>
      <ButtonGroup>
        <Button
          variant="contained"
          startIcon={<CopySvg />}
          disabled={!code}
          onClick={() => !!code && navigator.clipboard.writeText(code)}
        >
          Copy
        </Button>
        <Button
          variant="contained"
          startIcon={<ShareSvg />}
          disabled={!code}
          onClick={async () =>
            !!code &&
            (await navigator.share({
              title: "What's My Word?",
              text: 'I challenge you to guess my word!',
              url: `${window.location.href}/${code}`,
            }))
          }
        >
          Share
        </Button>
        <Button variant="contained" startIcon={<PlaySvg />} disabled={!code} onClick={() => !!code && navigate(code)}>
          Play
        </Button>
      </ButtonGroup>
    </div>
  );
};
