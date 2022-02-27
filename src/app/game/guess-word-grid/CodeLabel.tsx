import type { GameWordCode } from '../../../domain/game-word-service';

type Props = { code: GameWordCode };
export const CodeLabel = ({ code }: Props) => (
  <span className="text-right font-mono text-xs [gridArea:code-label]">
    CODE
    <br /> {code}
  </span>
);
