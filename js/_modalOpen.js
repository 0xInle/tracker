import { currentDate } from "./_currentDate.js"
import { addTransactions } from './_addTransactions.js'

// Вызов страницы портфолио
heroBtn.addEventListener('click', () => {
  hero.style.display = 'none'
  portfolio.style.display = 'block'
})

// Вызов модального окна с поиском
let addTransaction = document.getElementById('addTransaction')

addTransaction.addEventListener('click', () => {
  searchModal.style.display = 'block'
  document.body.classList.add('search-modal-open')

  assetTop()

  // Закрытие модального окна
  let portfolioSearchModalClose = document.querySelector('.portfolio__search-modal-close')

  portfolioSearchModalClose.addEventListener('click', () => {
    let portfolioSearchModalContentInp = document.querySelector('.portfolio__search-modal-content-inp')
    portfolioSearchModalContentInp.value = ''
    searchModal.style.display = 'none'
    document.body.classList.remove('search-modal-open')
  })
})

// Функция вызова топ-30 активов
export async function assetTop() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1')

    if (!response.ok) {
      throw new Error('Ошибка при получении данных')
    }

    const data = await response.json()

    const portfolioSearchModalList = document.getElementById('portfolioSearchModalList')
    portfolioSearchModalList.innerHTML = ''

    data.forEach(element => {
      const portfolioSearchModalItem = document.createElement('li')
      portfolioSearchModalItem.classList.add('portfolio__search-modal-item')
      const portfolioSearchModalBox = document.createElement('div')
      portfolioSearchModalBox.classList.add('portfolio__search-modal-box', "flex",)
      portfolioSearchModalBox.dataset.symbol = element.symbol;
      portfolioSearchModalBox.innerHTML = `
      <img src="${element.image}" alt="${element.name}" class="portfolio__search-modal-img">
      <div class="portfolio__search-modal-name">
      ${element.symbol}
      </div>
      <div class="portfolio__search-modal-subname">
      ${element.name}
      </div>
      `

      portfolioSearchModalList.appendChild(portfolioSearchModalItem);
      portfolioSearchModalItem.appendChild(portfolioSearchModalBox)

      callModal(portfolioSearchModalBox, element)
    });
    changeColor(selectedAction)
    closeModal()
    currentDate()
    setTimeout(currentDate, 60000)

  } catch (error) {
    console.error('Ошибка:', error.message);
  }
}

// Функция изменения цвета bay и sell
const portfolioModalBtnBay = document.querySelector('.portfolio__modal-btn-bay')
const portfolioModalBtnSell = document.querySelector('.portfolio__modal-btn-sell')
let selectedAction = ''; // Переменная для хранения buy или sell

function changeColor(selectedAction) {
  portfolioModalBtnSell.addEventListener('click', () => {
    portfolioModalBtnSell.classList.add('active-sell')
    portfolioModalBtnBay.classList.remove('active-bay')
    selectedAction = 'sell'
  })

  portfolioModalBtnBay.addEventListener('click', () => {
    portfolioModalBtnSell.classList.remove('active-sell')
    portfolioModalBtnBay.classList.add('active-bay')
    selectedAction = 'bay'
  })
}

// Функция закрытия модального окна
let portfolioModalClose = document.querySelector('.portfolio__modal-close')

function closeModal() {
  portfolioModalClose.addEventListener('click', () => {
    modal.style.display = 'none'
    searchModal.style.display = 'block'
  })
}

// Функция вызова модального окна транзакций
export let token
export function callModal(portfolioSearchModalBox, element) {
  portfolioSearchModalBox.addEventListener('click', () => {
    modal.style.display = 'block'
    searchModal.style.display = 'none'

    // Изменение цвета кнопок
    portfolioModalBtnBay.classList.add('active-bay')
    selectedAction = 'bay'

    let symbol = `${element.symbol}`
    token = element
    const portfolioModalAmountTicker = document.querySelector('.portfolio__modal-amount-ticker')
    portfolioModalAmountTicker.textContent = symbol

    addTransactions()
  })
}
