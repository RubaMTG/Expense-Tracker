document.addEventListener('DOMContentLoaded', loadExpenses);
document.getElementById('expense-form').addEventListener('submit', addExpense);

let currentEditIndex = null;

function addExpense(e) {
    e.preventDefault();
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = document.getElementById('expense-amount').value;

    const expenses = getExpenses();

    if (currentEditIndex !== null) {
        // Editing an existing expense
        expenses[currentEditIndex] = { name: expenseName, amount: parseFloat(expenseAmount) };
        currentEditIndex = null; // Reset edit index after editing
    } else {
        // Adding a new expense
        const expense = { name: expenseName, amount: parseFloat(expenseAmount) };
        expenses.push(expense);
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
    document.getElementById('expense-form').reset();
}

function displayExpenses() {
    const expenses = getExpenses();
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${expense.name}: $${expense.amount.toFixed(2)} 
            <button class="edit-button" onclick="editExpense(${index})">✏️ Edit</button>