import React from 'react';
import { TabPanels } from './components/TabPanels';

/**
 * App component.
 *
 * @returns {object} - <App />
 */
function App() {
  return (
    <main>
      <TabPanels actualWordLength={6} />
    </main>
  );
}

export { App };
