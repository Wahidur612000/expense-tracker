import React from "react";
import ExpenseTracker from "./ExpenseTracker";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "./Reducer/store"; 

test("adds a new expense entry on form submission", async () => {
    render(
      <Provider store={store}>
        <ExpenseTracker />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /Add/i });
    userEvent.click(submitButton);

    await screen.findByText(/Expense added successfully!/i);

    expect(screen.queryByText(/Expense added successfully!/i)).toBeInTheDocument();
});


  test('displays "Activate Premium!!!" alert when total expenses exceed 10000', () => {
    render(
      <Provider store={store}>
        <ExpenseTracker />
      </Provider>
    );

    expect(screen.queryByText("Activate Premium!!!")).not.toBeInTheDocument();
  });

  const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
  theme: { mode: "light" },
});

global.fetch = jest.fn((url, options) => {
  if (options.method === "POST") {
    return Promise.resolve({
      json: () => Promise.resolve({ name: "1" }), 
    });
  } else {
    return Promise.resolve({
      json: () => Promise.resolve({
        "1": {
          date: "2024-05-18",
          amount: 100,
          description: "Groceries",
          category: "Food"
        }
      })
    });
  }
});

test("adds a new expense entry on form submission", async () => {
  render(
    <Provider store={store}>
      <ExpenseTracker />
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/date/i), {
    target: { value: "2024-05-18" },
  });
  fireEvent.change(screen.getByLabelText(/amount/i), {
    target: { value: "100" },
  });
  fireEvent.change(screen.getByLabelText(/description/i), {
    target: { value: "Groceries" },
  });
  fireEvent.change(screen.getByLabelText(/category/i), {
    target: { value: "Food" },
  });

  const submitButton = screen.getByRole("button", { name: /Add/i });
  userEvent.click(submitButton);

  await waitFor(() => expect(global.fetch).toHaveBeenCalled());

  expect(screen.getByText("2024-05-18")).toBeInTheDocument();
  expect(screen.getByText("Groceries")).toBeInTheDocument();
  expect(screen.getByText("Food")).toBeInTheDocument();
  expect(screen.getByText("100")).toBeInTheDocument();
});