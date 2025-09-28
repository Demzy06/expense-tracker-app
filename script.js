const bodyEl = document.querySelector('body')
const menu = document.querySelector('.nav');
const openMenuBtn = document.querySelector('.nav-open-btn');
const closeMenuBtn = document.querySelector('.nav-close-btn')
const formInput = document.querySelector('.upload');
const amountInput = document.querySelector('.amount');
const selectInput = document.querySelector('.select');
const dateInput = document.querySelector('.date');
const textareaInput = document.querySelector('.description')
const addExpenseBtn = document.querySelector('.add-expense-btn');
const transactionsListParent = document.querySelector('.transactions-list');
const totalSpendingWidget = document.querySelector('.total-spend-value')
const totalBalanceWidget = document.querySelector('.total-balance-value')
const budgetInput = document.querySelector('.budget-input');
const addBudgetBtn = document.querySelector('.add-budget-btn');
const budgetWidget = document.querySelector('.budget-value');
const clearTransactionsBtn = document.querySelector('.clear-transactions')
const page = bodyEl.dataset.page;
console.log(page);

const state = {
  transactions: [],
  budget: '',
}

const openCloseMenuFtn = function (btn) {
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden')
    closeMenuBtn.classList.toggle('hidden')
    openMenuBtn.classList.toggle('hidden')
  })
}

const calcTotalSpending = function (transactions) {
  const totalSpending = transactions.reduce((acc, trans) => {
    return acc + +trans.amount
  }, 0)
  return totalSpending
}

const calcTotalBalance = function (budget, totalSpending) {
  return budget - totalSpending
}

const setItemLocalStorage = function (keyName, data) {
  localStorage.setItem(keyName, JSON.stringify(data))
}

const getItemlLocalStorage = function (keyName) {
  return localStorage.getItem(keyName)
}

window.addEventListener('DOMContentLoaded', function () {
  // Home page code base
  if (page === 'home') {
    const storage = getItemlLocalStorage('transactions');
    if (storage) state.transactions = (JSON.parse(storage));

    // getting budget from the local storage
    const budget = getItemlLocalStorage('budget')
    if (budget) {
      state.budget = JSON.parse(budget);
      budgetWidget.textContent = `$${state.budget}`;
    }

    // Calling ftn to calculate total spending
    const totalSpending = calcTotalSpending(state.transactions);
    totalSpendingWidget.textContent = `$${totalSpending}`;

    // Calling ftn to calculate total balance left 
    // & Checking if the total balance is less than zero
    const totalBalance = calcTotalBalance(state.budget, totalSpending);
    totalBalanceWidget.textContent = totalBalance < 0 ? `-$${Math.abs(totalBalance)}` : `$${totalBalance}`;

    const newTransactionsArr = state.transactions.slice(-5);
    console.log(newTransactionsArr);

    const renderExpense = function (data) {
      transactionsListParent.innerHTML = '';
      data.forEach(entry => {

        const markup = `
        <li>
        <p>${entry.description}</p>
        <p>${entry.category}</p>
        <p class="hidden">13-05-2025</p>
        <p>-$${entry.amount}</p>
        </li>
        <hr />
        `;
        transactionsListParent.insertAdjacentHTML("afterbegin", markup)
      })
    }
    renderExpense(newTransactionsArr);

    // Event listeners
    openCloseMenuFtn(openMenuBtn)
    openCloseMenuFtn(closeMenuBtn)
  };

  const validateInputs = function () {
    const amountInputValue = amountInput.value.trim()
    const selectInputValue = amountInput.value
    const dateInputValue = dateInput.value
    const textareaInputValue = textareaInput.value.trim()

    if (amountInputValue === '' || selectInputValue === '' || dateInputValue === '' || textareaInputValue === '') {
      amountInput.classList.add('input-form-error')
      selectInput.classList.add('input-form-error')
      dateInput.classList.add('input-form-error')
      textareaInput.classList.add('input-form-error')
      console.log("Fill all inputs");
    }
    else {
      const dataArr = [...new FormData(formInput)]

      const data = Object.fromEntries(dataArr)
      state.transactions.push(data);

      // setting expense to local storage
      setItemLocalStorage('transactions', state.transactions)

      // Clearing form input
      formInput.reset()
    }
  }

  // Add Expense page code base
  if (page === 'add-expense') {
    const storage = getItemlLocalStorage('transactions');
    if (storage) state.transactions = (JSON.parse(storage));

    addExpenseBtn.addEventListener('click', function (e) {
      e.preventDefault()
      validateInputs()
    })

    // Event listeners
    openCloseMenuFtn(openMenuBtn)
    openCloseMenuFtn(closeMenuBtn)
  };


  if (page === 'budget-page') {
    addBudgetBtn.addEventListener('click', function (e) {

      e.preventDefault();
      const budgetValue = budgetInput.value;
      state.budget = budgetValue;
      setItemLocalStorage('budget', state.budget)

      // Clearing form input
      budgetInput.value = '';
    })

    // Event listeners
    openCloseMenuFtn(openMenuBtn)
    openCloseMenuFtn(closeMenuBtn)
  }

  if (page === 'transactions-page') {
    const storage = getItemlLocalStorage('transactions');
    if (storage) state.transactions = (JSON.parse(storage));

    const renderExpense = function (data) {
      transactionsListParent.innerHTML = '';
      data.forEach(entry => {

        const markup = `
        <li>
        <p>${entry.description}</p>
        <p>${entry.category}</p>
        <p class="hidden">13-05-2025</p>
        <p>-$${entry.amount}</p>
        </li>
        <hr />
        `;
        transactionsListParent.insertAdjacentHTML("afterbegin", markup)
      })
    }
    renderExpense(state.transactions);

    // Event listeners
    openCloseMenuFtn(openMenuBtn)
    openCloseMenuFtn(closeMenuBtn)

    clearTransactionsBtn.addEventListener('click', function () {
      localStorage.clear();
      location.reload()
    })
  }
})





