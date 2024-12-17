let hero = document.getElementById('hero')
let heroBtn = document.getElementById('heroBtn')
let portfolio = document.getElementById('portfolio')
let addTransaction = document.getElementById('addTransaction')
let modal = document.getElementById('modal')
let searchModal = document.getElementById('searchModal')
let body = document.getElementById('body')
let portfolioModalClose = document.querySelector('.portfolio__modal-close')
let portfolioSearchModalClose = document.querySelector('.portfolio__search-modal-close')

heroBtn.addEventListener('click', () => {
  hero.style.display = 'none'
  portfolio.style.display = 'block'
})

addTransaction.addEventListener('click', async () => {
  document.body.classList.add('search-modal-open');

  const responseList = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1'
  );

  const data = await responseList.json();

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
    portfolioSearchModalBox.addEventListener('click', () => {

      if (portfolioSearchModalBox.dataset.symbol) {
        document.body.classList.remove('search-modal-open');
        document.body.classList.add('modal-open');

        let tiker = `${coin.symbol}`
        const portfolioModalAmountTicker = document.querySelector('.portfolio__modal-amount-ticker')
        portfolioModalAmountTicker.textContent = tiker
      }
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
