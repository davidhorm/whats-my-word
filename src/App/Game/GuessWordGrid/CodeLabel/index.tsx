import type { GameWordCode } from '../../../../domain/game-word-service';

type Props = { code: GameWordCode };
export const CodeLabel = ({ code }: Props) => (
  <span className="--align-right --mono-font" style={{ gridArea: 'code-label', fontSize: '0.75rem' }}>
    CODE
    <br /> {code}
  </span>
);
