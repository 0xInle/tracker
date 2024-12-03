async function fetchCryptoData(cryptoIds) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds.join(',')}&vs_currencies=usd&include_24hr_change=true`
  );
  const data = await response.json();
  return data;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
}

function formatPercentage(value) {
  return `${value.toFixed(2)}%`;
}

async function updatePrices() {
  const data = await fetchCryptoData(['bitcoin', 'ethereum', 'sui', 'sei-network']);

  document.getElementById('btc-price').textContent = formatCurrency(data.bitcoin.usd);
  document.getElementById('btc-procent').textContent = formatPercentage(data.bitcoin.usd_24h_change);

  document.getElementById('eth-price').textContent = formatCurrency(data.ethereum.usd);
  document.getElementById('eth-procent').textContent = formatPercentage(data.ethereum.usd_24h_change);

  document.getElementById('sui-price').textContent = formatCurrency(data.sui.usd);
  document.getElementById('sui-procent').textContent = formatPercentage(data.sui.usd_24h_change);

  document.getElementById('sei-price').textContent = formatCurrency(data['sei-network'].usd);
  document.getElementById('sei-procent').textContent = formatPercentage(data['sei-network'].usd_24h_change);
}

// Обновление цен каждые 60 секунд
setInterval(updatePrices, 60000);
updatePrices();
