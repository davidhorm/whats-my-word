import React from 'react';
import { YourWord } from './components/YourWord';

/**
 * App component.
 *
 * @returns {object} - <App />
 */
function App() {
  return (
    <main>
      <YourWord actualWordLength={6} />
    </main>
  );
}

export { App };
