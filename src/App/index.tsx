import { useState } from 'react';
import { Game } from './Game';
import { NewGameMenu } from './NewGameMenu';

/**
 * App component.
 */
export const App = () => {
  const [gameCode, setGameCode] = useState('');

  return <main>{!gameCode ? <NewGameMenu setGameCode={setGameCode} /> : <Game code={gameCode} />}</main>;
};
