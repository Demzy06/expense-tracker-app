import { state } from "./script";

const bodyEl = document.querySelector('body')
const page = bodyEl.dataset.page;

let ctx;
if (page === 'home') {
  ctx = document.getElementById('acquisitions').getContext('2d');
}

console.log(localStorage.getItem('label'))
console.log(localStorage.getItem('data'))


const getItemlLocalStorage = function (keyName) {
  return localStorage.getItem(keyName)
}

const setItemLocalStorage = function (keyName, data) {
  localStorage.setItem(keyName, JSON.stringify(data))
}

const getChartData = function () {
  setItemLocalStorage('label', spendingChart.data.labels)
  setItemLocalStorage('data', spendingChart.data.datasets[0].data)
  setItemLocalStorage('chartBackgroundColor', spendingChart.data.datasets[0].backgroundColor)
}

export const spendingChart = new Chart(ctx, {
  type: 'doughnut', // or 'pie' if you want a solid circle
  data: {
    labels: getItemlLocalStorage('label') ? JSON.parse(getItemlLocalStorage('label')) : [],
    datasets: [{
      label: 'Spending',
      data: getItemlLocalStorage('data') ? JSON.parse(getItemlLocalStorage('data')) : [],
      backgroundColor: getItemlLocalStorage('chartBackgroundColor') ? JSON.parse(getItemlLocalStorage('chartBackgroundColor')) : [],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom', // moves legend below chart
        labels: {
          color: '#fff', // white text (since your app is dark mode)
          font: { size: 14 },
        }
      }
    }
  }
});

export const updateChart = function (category, amount) {
  const index = spendingChart.data.labels.indexOf(category)
  if (index !== -1) {
    spendingChart.data.datasets[0].data[index] += amount;

    // Get chart details from local storage
    getChartData()

  } else {
    spendingChart.data.labels.push(category)
    spendingChart.data.datasets[0].data.push(amount)
    spendingChart.data.datasets[0].backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16));

    // Get chart details from local storage
    getChartData()
  }
}

