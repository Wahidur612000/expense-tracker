import React from "react";
import ExpenseTracker from "./ExpenseTracker";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "./Reducer/store"; // Make sure the correct path to the Redux store is imported

test("adds a new expense entry on form submission", async () => {
    render(
      <Provider store={store}>
        <ExpenseTracker />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /Add/i });
    userEvent.click(submitButton);

    // Wait for the confirmation message or a specific UI element after submission
    await screen.findByText(/Expense added successfully!/i);

    // Assertion
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
  // Add any other initial states if needed
});

// Mock the global fetch function
global.fetch = jest.fn((url, options) => {
  if (options.method === "POST") {
    return Promise.resolve({
      json: () => Promise.resolve({ name: "1" }), // Mock the response for adding an expense
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
      }) // Mock the response for fetching expenses
    });
  }
});

test("adds a new expense entry on form submission", async () => {
  render(
    <Provider store={store}>
      <ExpenseTracker />
    </Provider>
  );

  // Fill out the form
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

  // Wait for the alert to be called and the expense to be added
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());

  // Check that the new expense is in the document
  expect(screen.getByText("2024-05-18")).toBeInTheDocument();
  expect(screen.getByText("Groceries")).toBeInTheDocument();
  expect(screen.getByText("Food")).toBeInTheDocument();
  expect(screen.getByText("100")).toBeInTheDocument();
});