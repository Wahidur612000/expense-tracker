import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from './Login';

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

  test('submits the form and dispatches login action on successful login', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });

    // Assert that the login action is dispatched
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'LOGIN' });
  });

  test('displays error message on failed login', async () => {
    // Mocking a failed login scenario
    store.dispatch.mockRejectedValueOnce(new Error('Login failed'));
    
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
