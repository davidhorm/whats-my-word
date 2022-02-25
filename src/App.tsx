import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { Game, NewGameMenu } from './app/index';

/**
 * App component.
 */
export const App = () => (
  <Routes>
    <Route
      path="/whats-my-word"
      element={
        <main className="main">
          <Outlet />
        </main>
      }
    >
      <Route index element={<NewGameMenu />} />
      <Route path=":code" element={<Game />} />
    </Route>
  </Routes>
);
