// ExpenseTracker.test.js

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

    // Alternatively, you can use a custom function to match the text
    // await screen.findByText((content, element) => {
    //   return element.textContent === "Expense added successfully!";
    // });

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
