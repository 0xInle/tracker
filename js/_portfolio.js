let hero = document.getElementById('hero')
let heroBtn = document.getElementById('heroBtn')
let portfolio = document.getElementById('portfolio')
let addTransaction = document.getElementById('addTransaction')
let modal = document.getElementById('modal')
let searchModal = document.getElementById('searchModal')
let body = document.getElementById('body')
let portfolioModalClose = document.querySelector('.portfolio__modal-close')
let portfolioSearchModalClose = document.querySelector('.portfolio__search-modal-close')
let data
let portfolioArray = []
let transaction
let coinData = []; // Массив для хранения данных о криптовалютах

heroBtn.addEventListener('click', () => {
  hero.style.display = 'none'
  portfolio.style.display = 'block'
})

addTransaction.addEventListener('click', async () => {
  document.body.classList.add('search-modal-open');

  const responseList = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1'
  );

  data = await responseList.json();
  const portfolioSearchModalList = document.getElementById('portfolioSearchModalList')
  portfolioSearchModalList.innerHTML = ''

  data.forEach(coin => {
    const portfolioSearchModalItem = document.createElement('li')
    portfolioSearchModalItem.classList.add('portfolio__search-modal-item')
    const portfolioSearchModalBox = document.createElement('div')
    portfolioSearchModalBox.classList.add('portfolio__search-modal-box', "flex",)
    portfolioSearchModalBox.dataset.symbol = coin.symbol;
    portfolioSearchModalBox.innerHTML = `
    <img src="${coin.image}" alt="${coin.name}" class="portfolio__search-modal-img">
    <div class="portfolio__search-modal-name">
    ${coin.symbol}
    </div>
    <div class="portfolio__search-modal-subname">
    ${coin.name}
    </div>
    `

    // Записываем symbol и image в массив coinData
    coinData.push({
      symbol: coin.symbol,
      image: coin.image
    });

    portfolioSearchModalBox.addEventListener('click', () => {

      if (portfolioSearchModalBox.dataset.symbol) {
        document.body.classList.remove('search-modal-open');
        document.body.classList.add('modal-open');

        let tiker = `${coin.symbol}`
        const portfolioModalAmountTicker = document.querySelector('.portfolio__modal-amount-ticker')
        portfolioModalAmountTicker.textContent = tiker
      }

      const portfolioModalBtnBay = document.querySelector('.portfolio__modal-btn-bay')
      const portfolioModalBtnSell = document.querySelector('.portfolio__modal-btn-sell')
      portfolioModalBtnBay.classList.add('active-bay')

      portfolioModalBtnBay.addEventListener('click', () => {
        portfolioModalBtnBay.classList.add('active-bay')
        portfolioModalBtnSell.classList.remove('active-sell')
      })

      portfolioModalBtnSell.addEventListener('click', () => {
        portfolioModalBtnBay.classList.remove('active-bay')
        portfolioModalBtnSell.classList.add('active-sell')
      })

      let dateTimeInput = document.getElementById('date')
      let date = new Date()

      let day = String(date.getDate()).padStart(2, '0')
      let month = String(date.getMonth() + 1).padStart(2, '0')
      let year = String(date.getFullYear())
      let hours = String(date.getHours()).padStart(2, '0')
      let minutes = String(date.getMinutes()).padStart(2, '0')

      let formatDate = `${year}-${month}-${day}T${hours}:${minutes}`;

      dateTimeInput.value = formatDate;
    })

    portfolioModalClose.addEventListener('click', () => {
      document.body.classList.remove('modal-open');
      document.body.classList.add('search-modal-open');
    })

    portfolioSearchModalList.appendChild(portfolioSearchModalItem);
    portfolioSearchModalItem.appendChild(portfolioSearchModalBox)
  });

  portfolioSearchModalClose.addEventListener('click', () => {
    document.body.classList.remove('search-modal-open');
  })
})

const addBtn = document.querySelector('.portfolio__modal-add-btn')
const addAmount = document.getElementById('amount')
const addAsset = document.querySelector('.portfolio__modal-amount-ticker')
const addPrice = document.getElementById('price')
const addDate = document.getElementById('date')
const addTotal = document.getElementById('total')

addBtn.addEventListener('click', () => {
  const amount = addAmount.value
  const asset = addAsset.textContent
  const price = addPrice.value
  const date = addDate.value
  const total = addTotal.value

  transaction = {
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

  document.body.classList.remove('modal-open');
  // console.log(transaction)
  portfolioArray.push(transaction);

  rendering ()
})

// Функция получения Тотала
function updateTotal() {
  const amount = parseFloat(addAmount.value); // Получаем числовое значение из addAmount
  const price = parseFloat(addPrice.value); // Получаем числовое значение из addPrice

  // Если оба значения корректные (не NaN), рассчитываем total
  if (!isNaN(amount) && !isNaN(price)) {
    const total = amount * price; // Умножаем
    addTotal.value = total.toFixed(2); // Отображаем результат с 2 знаками после запятой
  } else {
    addTotal.value = ''; // Если одно из значений некорректно, очищаем поле total
  }
}

// Применяем валидацию при вводе в поля
addAmount.addEventListener('input', () => validateInput(addAmount));
addPrice.addEventListener('input', () => validateInput(addPrice));

// Функция валидации числовых полей

function validateInput(input) {
  input.value = input.value
    .replace(/[^0-9.]/g, '') // Удаляем все, кроме цифр и точки
    .replace(/(\..*?)\./g, '$1') // Убираем вторую точку
    .replace(/^0{2,}/, '0') // Убираем множественные начальные нули (например, 0001 → 01)
    .replace(/^0(\d)/, '$1') // Убираем начальный ноль перед числом (например, 01 → 1)
    .replace(/^(\d*\.\d{0,10}).*$/, '$1'); // Ограничиваем до 10 знаков после точки

  // Если значение начинается с точки, добавляем 0 перед точкой
  if (input.value.startsWith('.')) {
    input.value = '0' + input.value;
  }

  // Проверка, что значение является числом
  if (isNaN(input.value) || input.value === '') {
    input.value = ''; // Если введено нечисловое значение, очищаем поле
  }

  updateTotal();
}

addAmount.addEventListener('input', () => validateInput(addAmount));
addPrice.addEventListener('input', () => validateInput(addPrice));

// Функция отрисовки портфолио из созданного массива

function rendering() {
  console.log(portfolioArray); // Проверяем, что массив обновляется
  console.log(coinData); // Проверяем, что массив coinData обновляется

  const portfolioTokenList = document.querySelector('.portfolio__token-list');
  portfolioTokenList.innerHTML = ''; // Очистка списка

  // Перебираем все транзакции в массиве portfolioArray
  portfolioArray.forEach((transaction) => {
    // Создаем элемент списка для каждой транзакции
    const portfolioTokenItem = document.createElement('li');
    portfolioTokenItem.classList.add('portfolio__token-item', 'flex');

    // Создаем контейнеры для элементов внутри списка
    const portfolioTokenName = document.createElement('div');
    portfolioTokenName.classList.add('portfolioTokenName', 'portfolio__token-width', 'flex');

    const portfolioTokenImage = document.createElement('img');
    portfolioTokenImage.classList.add('portfolio__token-image');
    portfolioTokenImage.alt = 'Изображение';

    // Находим соответствующий объект в массиве coinData по символу
    const coin = coinData.find(coin => coin.symbol === transaction.asset);

    // Если нашли совпадение, подставляем картинку
    if (coin) {
      portfolioTokenImage.src = coin.image;
    } else {
      console.log('error: coin not found');
    }

    // Добавляем элементы в DOM
    portfolioTokenList.appendChild(portfolioTokenItem);
    portfolioTokenItem.appendChild(portfolioTokenName);
    portfolioTokenName.appendChild(portfolioTokenImage);
  });
}
