import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import { useNavigate } from 'react-router-dom';
import { CopySvg, PlaySvg, ShareSvg } from '../../../components/icons';

type Props = { code?: string };
export const CodeActions = ({ code }: Props) => {
  const navigate = useNavigate();
  return (
    <div>
      <span className={`font-mono ${!code && 'opacity-25'}`}>CODE: {code}</span>
      <ButtonGroup>
        <IconButton title="Copy Code" onClick={() => !!code && navigator.clipboard.writeText(code)} disabled={!code}>
          <CopySvg />
        </IconButton>
        <IconButton
          title="Share Code"
          onClick={async () =>
            !!code &&
            (await navigator.share({
              title: "What's My Word?",
              text: 'I challenge you to guess my word!',
              url: `${window.location.href}/${code}`,
            }))
          }
          disabled={!code}
        >
          <ShareSvg />
        </IconButton>
        <IconButton title="Play Code" onClick={() => !!code && navigate(code)} disabled={!code}>
          <PlaySvg />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};
