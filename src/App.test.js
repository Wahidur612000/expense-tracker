import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders SignUp component at root path', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const signUpElements = screen.queryAllByText(/Sign Up/i);
  expect(signUpElements.length).toBeGreaterThan(0);
});

test('renders Home component at /home path', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.queryAllByText(/Home/i)).toHaveLength(1);
});