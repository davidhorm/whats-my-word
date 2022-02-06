import { useState } from 'react';
import { Game } from './Game';
import './index.css';
import { NewGameMenu } from './NewGameMenu';

/**
 * App component.
 */
export const App = () => {
  const [gameCode, setGameCode] = useState('');

  return (
    <main className="main">{!gameCode ? <NewGameMenu setGameCode={setGameCode} /> : <Game code={gameCode} />}</main>
  );
};
