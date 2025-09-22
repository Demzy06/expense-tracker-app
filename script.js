const bodyEl = document.querySelector('body')
const menu = document.querySelector('.nav');
const formInput = document.querySelector('.upload');
const addExpenseBtn = document.querySelector('.add-expense-btn');
const transactionsListParent = document.querySelector('.transactions-list');
const openMenuBtn = document.querySelector('.nav-open-btn');
const totalSpendingWidget = document.querySelector('.total-spend-value')
const totalBalanceWidget = document.querySelector('.total-balance-value')

const page = bodyEl.dataset.page;
console.log(page);

const state = {
  transactions: [],
  budget: '',
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
// calcTotalBalance()
window.addEventListener('DOMContentLoaded', function () {

  // Add Expense page code base
  if (page === 'add-expense') {
    const storage = localStorage.getItem('transactions');
    if (storage) state.transactions = (JSON.parse(storage))


    addExpenseBtn.addEventListener('click', function (e) {
      e.preventDefault()
      const dataArr = [...new FormData(formInput)]
      console.log(dataArr);

      const data = Object.fromEntries(dataArr)
      state.transactions.push(data);
      localStorage.setItem('transactions', JSON.stringify(state.transactions))

      console.log(state);
      console.log(data);
    })

    // Event listeners
    openMenuBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden')
    })
  };

  // Home page code base
  if (page !== 'add-expense') {
    const storage = localStorage.getItem('transactions');
    if (storage) state.transactions = (JSON.parse(storage));

    // Calling ftn to calculate total spending
    const totalSpending = calcTotalSpending(state.transactions);
    totalSpendingWidget.textContent = `$${totalSpending}`;

    // Calling ftn to calculate total balance left and checking if the total balance is less than zero
    const totalBalance = calcTotalBalance(3000, totalSpending);

    totalBalanceWidget.textContent = totalBalance < 0 ?
      `-$${Math.abs(totalBalance)}` : `$${totalBalance}`;
;

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
        console.log('Hello');

      })
    }
    renderExpense(state.transactions);
    // console.log(state);
    // console.log(state.transactions);

    // Event listeners
    openMenuBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden')
    })
  };
})





