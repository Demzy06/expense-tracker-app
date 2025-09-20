const bodyEl = document.querySelector('body')
const formInput = document.querySelector('.upload');
const addExpenseBtn = document.querySelector('.add-expense-btn');
const transactionsListParent = document.querySelector('.transactions-list');
const openMenuBtn = document.querySelector('.nav-open-btn');
const menu = document.querySelector('.nav');

const state = {
  transactions: [],
}



window.addEventListener('DOMContentLoaded', function () {
  const page = bodyEl.dataset.page;
  console.log(page);

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

  if (page !== 'add-expense') {
    const storage = localStorage.getItem('transactions');
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





// const renderExpense = function (data) {
//   data.forEach(entry => {
//     const markup = `
//       <li>
//           <p>${entry.amount}</p>
//            <p>${entry.category}</p>
//           <p class="hidden">13-05-2025</p>
//           <p>-$${entry.decription}</p>
//         </li>
//       <hr />
//   `;
//     transactionsListParent.insertAdjacentHTML("afterbegin", markup)
//   })
// }
// renderExpense(state.transactions);
