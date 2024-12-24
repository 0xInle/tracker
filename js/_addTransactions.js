let portfolioArray = []
const portfolioModalAddBtn = document.querySelector('.portfolio__modal-add-btn')
const addAmount = document.getElementById('amount')
const addAsset = document.querySelector('.portfolio__modal-amount-ticker')
const addPrice = document.getElementById('price')
const addDate = document.getElementById('date')
const addTotal = document.getElementById('total')

// Функция добавления данных в массив
function handleAddTransaction() {
  const amount = addAmount.value
  const asset = addAsset.textContent
  const price = addPrice.value
  const date = addDate.value
  const total = addTotal.value

  let transaction = {
    amount,
    asset,
    price,
    date,
    total
  }

  addAmount.value = '';
  addPrice.value = '';
  addDate.value = '';
  addTotal.value = '';

  modal.style.display = 'none'
  document.body.classList.remove('search-modal-open')
  portfolioArray.push(transaction);
  console.log(portfolioArray)

  // Удаляем обработчик события
  portfolioModalAddBtn.removeEventListener('click', handleAddTransaction)
}

export function addTransactions() {
  portfolioModalAddBtn.addEventListener('click', handleAddTransaction)
}
