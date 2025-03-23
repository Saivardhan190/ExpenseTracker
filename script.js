let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to display expenses
function displayExpenses() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = ""; 

    expenses.forEach((expense, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <div class="expense-text">
                ${expense.name} - ₹${expense.amount} (${expense.category}) x${expense.quantity} - ${expense.date}
            </div>
            <div class="button-group">
                <button class="gold-btn" onclick="increaseQuantity(${index})">+</button>
                <button class="gold-btn" onclick="decreaseQuantity(${index})">-</button>
                <button class="gold-btn" onclick="deleteExpense(${index})">X</button>
            </div>
        `;
        expenseList.appendChild(li);
    });

    // Fix total amount calculation
    const totalAmount = expenses.reduce((sum, expense) => sum + (parseFloat(expense.amount) * expense.quantity), 0);
    document.getElementById("totalAmount").innerText = "Total: ₹" + totalAmount.toFixed(2);

    localStorage.setItem("expenses", JSON.stringify(expenses));
}


// Function to add a new expense
function addExpense() {
    let name = document.getElementById("expenseName").value.trim();
    let amount = parseFloat(document.getElementById("expenseAmount").value);
    let category = document.getElementById("expenseCategory").value;
    let date = new Date().toLocaleDateString();

    if (name && !isNaN(amount) && category) {
        let existingExpense = expenses.find(expense => expense.name === name);
        if (existingExpense) {
            existingExpense.quantity += 1;  // Increase quantity if same item exists
        } else {
            expenses.push({ name, amount, category, date, quantity: 1 });  // Initialize quantity
        }
        displayExpenses();
    } else {
        alert("Please enter valid details!");
    }
}

// Functions to update or delete expenses
function increaseQuantity(index) { 
    expenses[index].quantity += 1; 
    displayExpenses(); 
}
function decreaseQuantity(index) { 
    if (expenses[index].quantity > 1) {
        expenses[index].quantity--; 
    } else {
        expenses.splice(index, 1);  // Remove if quantity is 0
    }
    displayExpenses(); 
}
function deleteExpense(index) { 
    expenses.splice(index, 1); 
    displayExpenses(); 
}
function clearExpenses() { 
    if (confirm("Clear all expenses?")) expenses = []; 
    displayExpenses(); 
}

document.addEventListener("DOMContentLoaded", displayExpenses);
