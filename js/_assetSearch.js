import { assetTop } from './_modalOpen.js';
import { callModal } from './_modalOpen.js';

// Вывод активов в строке поиска
const options = { method: 'GET', headers: { accept: 'application/json' } };
let allAsset = []

async function assetSearch() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250', options)
    if (!response.ok) {
      throw new Error('Ошибка при получении данных')
    }
    allAsset = await response.json()
  } catch (error) {
    console.error('Ошибка', error.message)
  }
}
assetSearch()

// Функция фильтрации массива allAsset
function filterAsset(query) {
  return allAsset.filter(asset =>
    asset.symbol.toLowerCase().startsWith(query.toLowerCase())
  )
}

// Поиск активов при вводе в инпут
const portfolioSearchModalContentInp = document.querySelector('.portfolio__search-modal-content-inp')

portfolioSearchModalContentInp.addEventListener('input', (e) => {
  const query = e.target.value.trim();

  if (query.length > 0) {
    const filteredAsset = filterAsset(query)
    const portfolioSearchModalList = document.getElementById('portfolioSearchModalList')
    portfolioSearchModalList.innerHTML = ''

    filteredAsset.forEach(element => {
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
    })
  }

  if (portfolioSearchModalContentInp.value === '') {
    assetTop()
  }
})
