import { currentDate } from "./_currentDate.js"
import { addTransactions } from './_addTransactions.js'
import { allAsset } from "./_assetWithdrawal.js"

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

  assetTop(allAsset)

  // Закрытие модального окна
  let portfolioSearchModalClose = document.querySelector('.portfolio__search-modal-close')

  portfolioSearchModalClose.addEventListener('click', () => {
    let portfolioSearchModalContentInp = document.querySelector('.portfolio__search-modal-content-inp')
    portfolioSearchModalContentInp.value = ''
    searchModal.style.display = 'none'
    document.body.classList.remove('search-modal-open')
  })
})

// Функция отображения топ-30 активов
export async function assetTop(allAsset) {
  try {
    if (!allAsset || allAsset.length === 0) {
      throw new Error('Данные не загружены');
    }

    const topAssets = allAsset.sort((a, b) => b.market_cap - a.market_cap).slice(0, 30);

    const portfolioSearchModalList = document.getElementById('portfolioSearchModalList');
    portfolioSearchModalList.innerHTML = '';

    topAssets.forEach(element => {
      const portfolioSearchModalItem = document.createElement('li');
      portfolioSearchModalItem.classList.add('portfolio__search-modal-item');
      const portfolioSearchModalBox = document.createElement('div');
      portfolioSearchModalBox.classList.add('portfolio__search-modal-box', "flex");
      portfolioSearchModalBox.dataset.symbol = element.symbol;
      portfolioSearchModalBox.innerHTML = `
        <img src="${element.image}" alt="${element.name}" class="portfolio__search-modal-img">
        <div class="portfolio__search-modal-name">
          ${element.symbol}
        </div>
        <div class="portfolio__search-modal-subname">
          ${element.name}
        </div>
      `;

      portfolioSearchModalList.appendChild(portfolioSearchModalItem);
      portfolioSearchModalItem.appendChild(portfolioSearchModalBox);

      callModal(portfolioSearchModalBox, element);
    });

    changeColor(selectedAction);
    closeModal();
    currentDate();
    setTimeout(currentDate, 60000);

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
    const portfolioModalPriceInp = document.querySelector(".portfolio__modal-price-inp")
    portfolioModalPriceInp.value = element.current_price

    addTransactions()
  })
}

// Функция подсчета total и отображения в portfolio__modal-price-inp
const amounInp = document.getElementById('amount')
const priceInp = document.getElementById('price')
const totalInp = document.getElementById('total')

function calculatTotal() {
  const amount = parseFloat(amounInp.value)
  const price = parseFloat(priceInp.value)

  totalInp.value = amount * price
}

amounInp.addEventListener('input', calculatTotal)
priceInp.addEventListener('input', calculatTotal)
