import { token } from './_modalOpen.js'

let portfolioArray = []
const portfolioModalAddBtn = document.querySelector('.portfolio__modal-add-btn')
const addAmount = document.getElementById('amount')
const addAsset = document.querySelector('.portfolio__modal-amount-ticker')
const addPrice = document.getElementById('price')
const addDate = document.getElementById('date')
const addTotal = document.getElementById('total')

let portfolioTokenList = document.querySelector('.portfolio__token-list')

// Функция добавления данных в массив
function handleAddTransaction() {
  const amount = addAmount.value
  const asset = addAsset.textContent
  // const price = addPrice.value
  const date = addDate.value
  const total = addTotal.value

  const name = token.name
  const image = token.image
  const price = token.current_price
  const percent = token.market_cap_change_percentage_24h

  let transaction = {
    amount,
    asset,
    price,
    date,
    total,
    name,
    image,
    percent
  }

  addAmount.value = '';
  addPrice.value = '';
  addDate.value = '';
  addTotal.value = '';

  modal.style.display = 'none'
  document.body.classList.remove('search-modal-open')
  portfolioArray.push(transaction);
  console.log(token)

  const portfolioTokenItem = document.createElement('li')
  portfolioTokenItem.classList.add('portfolio__token-item', 'flex')
  const portfolioTokenContainer = document.createElement('div')
  portfolioTokenContainer.classList.add('portfolio__token-name', 'portfolio__token-width', 'flex')
  portfolioTokenContainer.innerHTML = `
  <img src="${image}" alt="${name}" class="portfolio__token-image">
  <div class="portfolio__token-name-container flex">
  <div class="portfolio__token-name-income">
  ${asset}
  </div>
  <div class="portfolio__token-name-descr">
    ${name}
  </div>
  <div class="portfolio__token-price-container portfolio__token-width flex">
  <div class="portfolio__token-price-income">
  ${price}
  </div>
  <div class="portfolio__token-price-procent">
    ${percent}
  </div>
  </div>
  `

  portfolioTokenList.appendChild(portfolioTokenItem)
  portfolioTokenItem.appendChild(portfolioTokenContainer)


  // const portfolioSearchModalBox = document.createElement('div')
  // portfolioSearchModalBox.classList.add('portfolio__search-modal-box', "flex",)
  // portfolioSearchModalBox.dataset.symbol = element.symbol;
  // portfolioSearchModalBox.innerHTML = `
  // <img src="${element.image}" alt="${element.name}" class="portfolio__search-modal-img">
  // <div class="portfolio__search-modal-name">
  // ${element.symbol}
  // </div>
  // <div class="portfolio__search-modal-subname">
  // ${element.name}
  // </div>
  // `

  // Удаляем обработчик события
  portfolioModalAddBtn.removeEventListener('click', handleAddTransaction)
}

export function addTransactions() {
  portfolioModalAddBtn.addEventListener('click', handleAddTransaction)
}

