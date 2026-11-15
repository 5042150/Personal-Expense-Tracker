
let expenses = JSON.parse(
    localStorage.getItem("expenses")
) || [];

// Add Expense Function
function addExpense() {

    let name = document.getElementById("expenseName").value;
    let amount = Number(
        document.getElementById("expenseAmount").value
    );
    let category = document.getElementById("category").value;
    let date = document.getElementById("expenseDate").value;

    if (name.trim() === "" || amount <= 0 ||
        category === "" || date === "") {

        alert("Please enter all valid details!");
        return;
    }

    let expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);

    saveData();
    displayExpenses();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("expenseDate").value = "";
}

// Save Data
function saveData() {
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}

// Display Expenses
function displayExpenses() {

    let list = document.getElementById("expenseList");
    let filter = document.getElementById("filter").value;

    list.innerHTML = "";

    let filteredExpenses = expenses.filter(function(e) {
        return filter === "All" || e.category === filter;
    });

    filteredExpenses.forEach(function(e) {

        let row = document.createElement("tr");

        let values = [e.name, e.category, "₹" + e.amount, e.date];

        values.forEach(function(value) {
            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        let actionCell = document.createElement("td");
        let button = document.createElement("button");

        button.textContent = "Delete";
        button.className = "delete-btn";

        button.onclick = function() {
            deleteExpense(e.id);
        };

        actionCell.appendChild(button);
        row.appendChild(actionCell);

        list.appendChild(row);
    });

    calculateTotal();
}

// Calculate Total
function calculateTotal() {

    let total = expenses.reduce(function(sum, e) {
        return sum + e.amount;
    }, 0);

    document.getElementById("total").textContent =
        "₹" + total.toFixed(2);
}

// Delete Expense
function deleteExpense(id) {

    expenses = expenses.filter(function(e) {
        return e.id !== id;
    });

    saveData();
    displayExpenses();
}

// Load Saved Records
displayExpenses();
