const addExpenseButton = document.getElementById("add-expense"); 
document.addEventListener('DOMContentLoaded', () => { 
  displaySavedExpenses()
})

addExpenseButton.addEventListener("click", () => { 
  const item = document.getElementById("item");
  const cost = document.getElementById("cost");
  const date = document.getElementById("date");
  const location = document.getElementById("location");
  const expense = {
    id: Math.random(),
    item: item.value,
    cost: cost.value,
    date: date.value,
    location: location.value,
  }

  displayExpense(expense);
  saveExpense(expense);
  
  //reset inputs
  item.value = '';
  cost.value = '';
  date.value = '';
  location.value = '';
})


function displaySavedExpenses() { 
  const savedExpenses = getSavedExpenses(); 
  savedExpenses.forEach(expense => {
    displayExpense(expense);
  });
}

function displayExpense(expense) { 
  const expenseTableRow = document.createElement('tr'); 
  const newExpenseTableRow = addExpenseDataToExpenseTableRow(expenseTableRow, expense)
  const expensesTable = document.getElementById('expenses');
  expensesTable.appendChild(newExpenseTableRow);
}

function createExpenseTableData(expenseInformation) { 
  const expenseTableData = document.createElement('td');
  expenseTableData.textContent = expenseInformation; 

  return expenseTableData; 
}

function addExpenseDataToExpenseTableRow(expensesTableRow, expense) { 
    for (const expanseData in expense) { 
      if (expanseData === 'id') {
        continue
      }
      expensesTableRow.appendChild(createExpenseTableData(expense[expanseData]));
    }

    const deleteButton = createDeleteButton(expense.id, expensesTableRow); 
    expensesTableRow.appendChild(deleteButton); 
    return expensesTableRow;
}

function createDeleteButton(id, expensesTableRow) { 
  const deleteButton = document.createElement('button'); 
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => { 
    deleteExpense(id);
    expensesTableRow.remove(); 
  })
  return deleteButton; 
}


function deleteExpense(id) { 
  const expenses = getSavedExpenses(); 
  const newExpenses =  expenses.filter(expense => expense.id !== id); 
  localStorage.setItem('expenses', JSON.stringify(newExpenses)); 
}

function saveExpense(expense) { 
  const expenses = getSavedExpenses(); 
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses)); 
}

function getSavedExpenses() { 
  return JSON.parse(localStorage.getItem('expenses')) || [];
}