import React, { useState } from 'react';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('Expense'); // Default to Expense
  const [expenses, setExpenses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      date: date,
      amount: Number(amount), // Convert to number
      description: description,
      category: category,
      type: type
    };
    setExpenses([...expenses, newExpense]);
    // Clear the form fields
    setDate('');
    setAmount('');
    setDescription('');
    setCategory('');
    setType('Expense');
  };

  // Calculate total income and total expense
  const totalIncome = expenses
    .filter(expense => expense.type === 'Income')
    .reduce((total, expense) => total + expense.amount, 0);

  const totalExpense = expenses
    .filter(expense => expense.type === 'Expense')
    .reduce((total, expense) => total + expense.amount, 0);

  // Calculate savings
  const savings = totalIncome - totalExpense;

  const savingsClass = savings >= 0 ? 'positive' : 'negative';

  return (
    <div className="expense-tracker">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />

        <label htmlFor="description">Description:</label>
        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Salary">Salary</option>
          {/* Add more options as needed */}
        </select>

        <label htmlFor="type">Type:</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>

        <button type="submit">Add</button>
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
          </tr>
        </thead>
        <tbody>
          {/* Expense rows */}
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>{expense.type === 'Income' ? expense.amount : ''}</td>
              <td>{expense.type === 'Expense' ? expense.amount : ''}</td>
            </tr>
          ))}
          {/* Total rows */}
          <tr>
            <td colSpan="3">Total</td>
            <td>{totalIncome}</td>
            <td>{totalExpense}</td>
          </tr>
          <tr>
            <td colSpan="4">Savings</td>
            <td className={savingsClass}>{savings}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTracker;
