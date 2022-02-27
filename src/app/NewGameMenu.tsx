import { GenerateCode, NewGame } from './new-game-menu';
import './NewGameMenu.css';

export const NewGameMenu = () => (
  <main className="flex flex-col items-center gap-6">
    <h1 className="text-4xl">What's My Word?</h1>

    <NewGame />
    <GenerateCode />
  </main>
);
