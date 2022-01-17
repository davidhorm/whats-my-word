import { useState } from 'react';
import { NewGameMenu } from './components/NewGameMenu';

/**
 * App component.
 */
function App() {
  const [gameCode, setGameCode] = useState('');
  return <main>{!gameCode ? <NewGameMenu setGameCode={setGameCode} /> : <div>Code: {gameCode}</div>}</main>;
}

export { App };
