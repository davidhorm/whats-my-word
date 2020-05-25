import React from 'react';
import { NewGameMenu } from './components/NewGameMenu';
import { TabPanels } from './components/TabPanels';

/**
 * App component.
 *
 * @returns {object} - <App />
 */
function App() {
  const [wordLength, setWordLength] = React.useState(0);
  return (
    <main>
      {!wordLength ? <NewGameMenu setWordLength={setWordLength} /> : <TabPanels actualWordLength={wordLength} />}
    </main>
  );
}

export { App };
