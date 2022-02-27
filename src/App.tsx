import { Outlet, Route, Routes } from 'react-router-dom';
import { Game, NewGameMenu } from './app/index';

/**
 * App component.
 */
export const App = () => (
  <Routes>
    <Route
      path="/whats-my-word"
      element={
        <div className="mx-auto max-w-md font-sans antialiased">
          <Outlet />
        </div>
      }
    >
      <Route index element={<NewGameMenu />} />
      <Route path=":code" element={<Game />} />
    </Route>
  </Routes>
);
