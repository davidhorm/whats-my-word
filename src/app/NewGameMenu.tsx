import { ReactComponent as LogoSvg } from '../components/icons/logo.svg';
import { GenerateCode, NewGame } from './new-game-menu';

export const NewGameMenu = () => (
  <main className="flex flex-col items-center gap-6">
    <h1 className="whitespace-nowrap text-4xl uppercase">
      <LogoSvg className="inline-block h-9 w-9" />
      What's My Word?
    </h1>

    <NewGame />
    <GenerateCode />
  </main>
);
