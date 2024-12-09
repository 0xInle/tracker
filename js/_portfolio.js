let hero = document.getElementById('hero')
let heroBtn = document.getElementById('heroBtn')
let portfolio = document.getElementById('portfolio')
let addTransaction = document.getElementById('addTransaction')
let modal = document.getElementById('modal')
let body = document.getElementById('body')

heroBtn.addEventListener('click', () => {

  hero.style.display = 'none'
  portfolio.style.display = 'block'
})

addTransaction.addEventListener('click', () => {

  // modal.style.display = 'block'
  console.log('ckkckd')
  document.body.classList.add('modal-open');
})
