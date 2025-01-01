import { token } from './_modalOpen.js'
import { formatCurrency } from './_assetWithdrawal.js'
import { formatPercentage } from './_assetWithdrawal.js'

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
  const amount = parseFloat(addAmount.value) // Колличество купленных активов
  const asset = addAsset.textContent // Название актива
  const date = addDate.value // Дата транзакции
  const total = addTotal.value // Общее колличество потраченых USD
  const name = token.name // Имя актива
  const image = token.image // Логотип актива
  const currentPrice = parseFloat(token.current_price) // Текущая цена актива
  const price = parseFloat(addPrice.value) || currentPrice // Цена покупки
  const percent = formatPercentage(token.market_cap_change_percentage_24h) // Процент изменения за 24 часа
  const symbol = token.symbol // Тикер актива

  let totalAmount = amount * price
  let formattedTotal = formatCurrency(totalAmount)

  let profit = (currentPrice - price) * amount
  let formatCurrentPrice = formatCurrency(currentPrice)
  let formatProfit = formatCurrency(profit)

  let profitPercent = ((currentPrice - price) / price) * 100
  let formatProfitPercent = formatPercentage(profitPercent)

  let totalHoldings = amount * currentPrice
  let formatTotalHoldings = formatCurrency(totalHoldings)

  const avg = totalAmount / amount // Средняя цена
  let formatAvg = formatCurrency(avg);
  console.log(formatAvg)

  let transaction = {
    amount,
    asset,
    date,
    total,
    name,
    image,
    price,
    currentPrice,
    percent,
    formattedTotal,
    formatProfit,
    formatProfitPercent,
    symbol,
    totalHoldings,
    avg
  }

  addAmount.value = '';
  addPrice.value = '';
  addDate.value = '';
  addTotal.value = '';

  modal.style.display = 'none'
  document.body.classList.remove('search-modal-open')
  portfolioArray.push(transaction);

  const portfolioTokenItem = document.createElement('li')
  portfolioTokenItem.classList.add('portfolio__token-item', 'flex')
  const portfolioTokenContainer = document.createElement('div')
  portfolioTokenContainer.classList.add('portfolio__token-container', 'flex')
  portfolioTokenContainer.innerHTML = `
  <div class="portfolio__token-name portfolio__token-width-sm flex">
    <img src="${image}" alt="${name}" class="portfolio__token-image">
    <div class="portfolio__token-name-container">
      <div class="portfolio__token-name-income">
        ${asset}
      </div>
      <div class="portfolio__token-name-descr">
        ${name}
      </div>
    </div>
  </div>
  <div class="portfolio__token-price-container portfolio__token-width">
    <div class="portfolio__token-price-income">
      ${formatCurrentPrice}
    </div>
    <div class="portfolio__token-price-procent">
      ${percent}
    </div>
  </div>
  <div class="portfolio__token-total-container portfolio__token-width">
    <div class="portfolio__token-total-income">
      ${formattedTotal}
    </div>
  </div>
  <div class="portfolio__token-total-container portfolio__token-width">
    <div class="portfolio__token-total-income">
      ${formatAvg}
    </div>
  </div>
  <div class="portfolio__token-profit-container portfolio__token-width">
    <div class="portfolio__token-profit-income">
      ${formatProfit}
    </div>
    <div class="portfolio__token-profit-procent">
      ${formatProfitPercent}
    </div>
  </div>
  <div class="portfolio__token-holdings-container portfolio__token-width">
    <div class="portfolio__token-holdings-income">
      ${formatTotalHoldings}
    </div>
    <div class="portfolio__token-holdings-token">
    ${amount} ${symbol}
    </div>
  </div>
  `

  portfolioTokenList.appendChild(portfolioTokenItem)
  portfolioTokenItem.appendChild(portfolioTokenContainer)

  // Удаляем обработчик события
  portfolioModalAddBtn.removeEventListener('click', handleAddTransaction)
}

export function addTransactions() {
  portfolioModalAddBtn.addEventListener('click', handleAddTransaction)
}
