import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from './Login';

// Mock action for login
const loginAction = { type: 'LOGIN' };

const mockStore = configureStore([]);

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      theme: { mode: 'light' },
      auth: { isLoggedIn: false },
    });

    store.dispatch = jest.fn();
  });

  test('submits the form and dispatches login action', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });

    // Use act to wrap asynchronous actions
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });
  
    // Assert that the login action is dispatched
    expect(store.dispatch).toHaveBeenCalledWith(loginAction);
  });

  test('renders error message if login fails', async () => {
    // Mocking a failed login scenario
    store.dispatch.mockRejectedValue(new Error('Login failed'));
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'incorrectpassword' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });

    // Assert that an error message is rendered
    expect(screen.queryByText(/login failed/i)).toBeInTheDocument();
  });
});
