import React, { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import "./ExpenseTracker.css";


const ExpenseTracker = () => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedExpense) {
      handleUpdate(selectedExpense.id, {
        date: date || selectedExpense.date,
        amount: Number(amount) || selectedExpense.amount,
        description: description || selectedExpense.description,
        category: category || selectedExpense.category,
      });
    } else {
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
        } else {
          throw new Error("Failed to delete expense");
        }
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
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
        } else {
          throw new Error("Failed to update expense");
        }
      })
      .catch((error) => {
        console.error("Error updating expense:", error);
      });
  };

  const clearForm = () => {
    setDate("");
    setAmount("");
    setDescription("");
    setCategory("");
    setSelectedExpense(null);
  };

  const handleEdit = (expense) => {
    setDate(expense.date);
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategory(expense.category);
    setSelectedExpense(expense);
  };

  const totalIncome = expenses
    .filter((expense) => expense.category === "Salary")
    .reduce((total, expense) => total + expense.amount, 0);

  const totalExpense = expenses
    .filter((expense) => expense.category !== "Salary")
    .reduce((total, expense) => total + expense.amount, 0);

  const savings = totalIncome - totalExpense;
  const savingsClass = savings >= 0 ? "positive" : "negative";

  const downloadExpenses = () => {
    const csvContent = "data:text/csv;charset=utf-8," + expenses.map(e => `${e.date},${e.amount},${e.description},${e.category}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  const theme = useSelector((state) => state.theme.mode); 

  return (
    <div className={`expense-tracker ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}>
      <h2>Add Expense</h2>
      <br />
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
          {totalExpense >= 10000 ? "Upgrade to Premium" : selectedExpense ? "Update" : "Add"}
        </button>
      </form>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <span>{expense.date}</span>  <span>{expense.description}</span> {" "}
            <span>{expense.category}</span>  <span>{expense.category === "Salary" ? expense.amount : ""}</span> {" "}
            <span>{expense.category !== "Salary" ? expense.amount : ""}</span>
            <button onClick={() => handleEdit(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
        <div>Total Income: {totalIncome}</div>
        <div>Total Expense: {totalExpense}</div>
        <div className={savingsClass}>Savings: {savings}</div>
      </ul>
      <button onClick={downloadExpenses} style={{ background: theme === "light" ? "black" : "white", color: theme === "light" ? "white" : "black" }}>
        Download Expenses
      </button>
    </div>
  );
};

export default ExpenseTracker;
