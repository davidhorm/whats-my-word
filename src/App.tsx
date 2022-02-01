import { useState } from 'react';
import { Game } from './App/Game';
import { NewGameMenu } from './components/NewGameMenu';

/**
 * App component.
 */
function App() {
  const [gameCode, setGameCode] = useState('');

  return <main>{!gameCode ? <NewGameMenu setGameCode={setGameCode} /> : <Game code={gameCode} />}</main>;
}

export { App };
