// document.getElementById('crypto-search-form').addEventListener('submit', async (event) => {
//   event.preventDefault(); // Отменяем стандартное поведение формы

//   const ticker = document.getElementById('crypto-ticker').value.trim().toLowerCase(); // Получаем введенный тикер
//   if (!ticker) {
//     console.log("Введите тикер.");
//     return;
//   }

//   try {
//     // 1. Получаем список всех монет
//     const responseList = await fetch('https://api.coingecko.com/api/v3/coins/list');
//     const coins = await responseList.json();

//     // 2. Ищем введенный тикер в списке
//     const coin = coins.find(coin => coin.symbol.toLowerCase() === ticker);
//     if (!coin) {
//       console.log(`Монета с тикером "${ticker}" не найдена.`);
//       return;
//     }

//     // 3. Получаем полные данные о найденной монете
//     const responseData = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}`);
//     const coinData = await responseData.json();

//     // 4. Выводим данные в консоль
//     console.log(coinData);

//   } catch (error) {
//     console.error("Произошла ошибка при поиске:", error);
//   }
// });

