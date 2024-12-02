// let hero = document.getElementById('hero')
// let heroBtn = document.getElementById('heroBtn')

// heroBtn.addEventListener('click',() => {

//   hero.innerHTML = ''
// })

async function fetchCryptoPrice(cryptoId) {
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
  const data = await response.json();
  return data[cryptoId].usd;
}

async function updatePrices() {
  const btcPrice = await fetchCryptoPrice('bitcoin');

  document.getElementById('btc-price').textContent = `$${btcPrice.toFixed(2)}`;
}

// Обновление цен каждые 60 секунд
setInterval(updatePrices, 60000);
updatePrices();
