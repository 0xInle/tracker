// Запрос активов на главную страницу
const options = { method: 'GET', headers: { accept: 'application/json' } };

function fetchAndUpdateData() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20sui%2Csei-network&price_change_percentage=1h&precision=2', options)
    .then(res => res.json())
    .then(data => {
      const btc = data[0];
      const eth = data[1];
      const sui = data[2];
      const sei = data[3];

      document.getElementById('btc-price').textContent = formatCurrency(btc.current_price);
      document.getElementById('btc-procent').textContent = formatPercentage(btc.market_cap_change_percentage_24h);

      document.getElementById('eth-price').textContent = formatCurrency(eth.current_price);
      document.getElementById('eth-procent').textContent = formatPercentage(eth.market_cap_change_percentage_24h);

      document.getElementById('sui-price').textContent = formatCurrency(sui.current_price);
      document.getElementById('sui-procent').textContent = formatPercentage(sui.market_cap_change_percentage_24h);

      document.getElementById('sei-price').textContent = formatCurrency(sei.current_price);
      document.getElementById('sei-procent').textContent = formatPercentage(sei.market_cap_change_percentage_24h);

      // Функция изменения цвета для market_cap_change_percentage
      function changeColor() {
        const btcPercentage = btc.market_cap_change_percentage_24h;
        const ethPercentage = eth.market_cap_change_percentage_24h;
        const suiPercentage = sui.market_cap_change_percentage_24h;
        const seiPercentage = sei.market_cap_change_percentage_24h;

        document.getElementById('btc-procent').style.color = btcPercentage > 0 ? '#46a756' : '#ae3434';
        document.getElementById('eth-procent').style.color = ethPercentage > 0 ? '#46a756' : '#ae3434';
        document.getElementById('sui-procent').style.color = suiPercentage > 0 ? '#46a756' : '#ae3434';
        document.getElementById('sei-procent').style.color = seiPercentage > 0 ? '#46a756' : '#ae3434';
      }
      changeColor();
    })
}

fetchAndUpdateData()

setInterval(fetchAndUpdateData, 60000)

// Функция форматирования цены
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value).replace(/,/g, ' ') + ' $';
}

// Функция форматирования процентов
function formatPercentage(value) {
  return value.toFixed(2) + ' %'
}
