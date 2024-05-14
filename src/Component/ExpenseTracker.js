import React, { useState, useEffect,useReducer } from "react";
import "./ExpenseTracker.css";
import themeReducer from "./Reducer/themeReducer";


const ExpenseTracker = (isLightMode) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    // If there's a selected expense, perform update
    if (selectedExpense) {
      handleUpdate(selectedExpense.id, {
        date: date || selectedExpense.date,
        amount: Number(amount) || selectedExpense.amount,
        description: description || selectedExpense.description,
        category: category || selectedExpense.category,
      });
    } else {
      // Otherwise, perform add expense
      const newExpense = {
        date: date,
        amount: Number(amount),
        description: description,
        category: category,
      };
      addExpense(newExpense);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    fetch(
      "https://expensetracker-db9b3-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const fetchedExpenses = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setExpenses(fetchedExpenses);
        }
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  };

  const addExpense = (newExpense) => {
    fetch(
      "https://expensetracker-db9b3-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Expense added:", data);
        setExpenses([...expenses, { id: data.name, ...newExpense }]);
        clearForm();
        alert("Expense added successfully!");
      })
      .catch((error) => console.error("Error adding expense:", error));
  };

  const handleDelete = (id) => {
    fetch(
      `https://expensetracker-db9b3-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          setExpenses(expenses.filter((expense) => expense.id !== id));
          alert("Expense deleted successfully!");
        } else {
          throw new Error("Failed to delete expense");
        }
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
        alert("Failed to delete expense. Please try again.");
      });
  };

  const handleUpdate = (id, updatedExpense) => {
    fetch(
      `https://expensetracker-db9b3-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(updatedExpense),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          const updatedExpenses = expenses.map((expense) => {
            if (expense.id === id) {
              return { ...expense, ...updatedExpense };
            }
            return expense;
          });
          setExpenses(updatedExpenses);
          clearForm();
          alert("Expense updated successfully!");
        } else {
          throw new Error("Failed to update expense");
        }
      })
      .catch((error) => {
        console.error("Error updating expense:", error);
        alert("Failed to update expense. Please try again.");
      });
  };

  const clearForm = () => {
    setDate("");
    setAmount("");
    setDescription("");
    setCategory("");
    setSelectedExpense(null); // Reset selected expense
  };

  const handleEdit = (expense) => {
    // When edit button is clicked, populate the form fields with the selected expense data
    setDate(expense.date);
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategory(expense.category);
    setSelectedExpense(expense); // Set selected expense for editing
  };

  // Calculate total income and total expense
  const totalIncome = expenses
    .filter((expense) => expense.category === "Salary")
    .reduce((total, expense) => total + expense.amount, 0);

  const totalExpense = expenses
    .filter((expense) => expense.category !== "Salary")
    .reduce((total, expense) => total + expense.amount, 0);

  // Calculate savings
  const savings = totalIncome - totalExpense;

  // Determine savings class
  const savingsClass = savings >= 0 ? "positive" : "negative";

  const downloadExpenses = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + expenses.map(e => `${e.date},${e.amount},${e.description},${e.category}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="expense-tracker">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" disabled={totalExpense >= 10000}>
          {totalExpense >= 10000? "Upgrade to Premium": selectedExpense? "Update"  : "Add"}
        </button>
      </form>

      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Income</th>
            <th>Expense</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>{expense.category === "Salary" ? expense.amount : ""}</td>
              <td>{expense.category !== "Salary" ? expense.amount : ""}</td>
              <td>
                <button onClick={() => handleEdit(expense)}>Edit</button>
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="3">Total</td>
            <td>{totalIncome}</td>
            <td>{totalExpense}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="4">Savings</td>
            <td className={savingsClass}>{savings}</td>
            <td> <button onClick={downloadExpenses} style={{background:"black"}}>Download Expenses</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTracker;
