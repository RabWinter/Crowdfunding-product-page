'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelectorAll('.overlay');
const about = document.querySelector('.about');
const fadeEls = document.querySelectorAll('.has-fade');
const forms = document.querySelectorAll('form');
const btnContinue = document.querySelectorAll('.btn-continue');
const btnContinue1 = document.querySelector('#item-bamboo');
const btnContinue2 = document.querySelector('#item-black');
const btnBookmark = document.querySelector('.btn-bookmark');
const bookmarkText = document.querySelector('.project__bookmark--text');
const bookmarkTextChecked = document.querySelector(
 '.project__bookmark--text-checked'
);
let input1 = document.querySelector('#pledge-value-1');
let input2 = document.querySelector('#pledge-value-2');
const numRemainingBamboo = document.querySelectorAll(
 '.number__remaining--bamboo'
);
const numRemainingBlack = document.querySelectorAll(
 '.number__remaining--black'
);
const numRemaining = document.querySelectorAll('.number__remaining');
const totalMoney = document.querySelector('#total-money');
const totalBackers = document.querySelector('#total-backers');
const btnBack = document.querySelector('#btnBack');
const btnClose = document.querySelector('.btn-close');
const btnRadio = document.querySelectorAll('input[type=radio]');
const btnReward = document.querySelectorAll('.btn-select');
const btnGot = document.querySelector('.btn-got-it');
const btnHamburger = document.querySelector('#btnHamburger');
const progressBar = document.querySelector('.figures__bar');
const success = document.querySelector('.success');
const successTitle = document.querySelector('.success__title');
const successText = document.querySelector('.success__text');
const targetAmount = 100000;

let totalMoneyCount = 89914;
let backers = 5007;

// Functions

function showModal() {
 modal.classList.add('show-modal');
}

function closeModal() {
 modal.classList.remove('show-modal');
}

function unChecked() {
 btnRadio.forEach((btn) => {
  btn.parentNode.classList.remove('item');
  btn.parentNode.classList.remove('border-active');
  btn.checked = false;
 });
}

function format(el) {
 return el.toLocaleString();
}

function countBackers() {
 backers += 1;
 totalBackers.textContent = `${format(backers)}`;
}

// Bookmark Toggle
function bookmarkCheck() {
 btnBookmark.classList.toggle('project__icon--bookmark-checked');
 if (btnBookmark.classList.contains('project__icon--bookmark-checked')) {
  bookmarkText.textContent = 'Bookmarked';
  bookmarkText.style.color = '#147b74';
 } else {
  bookmarkText.textContent = 'Bookmark';
  bookmarkText.style.color = '#7a7a7a';
 }
}

// Update Progress Bar
function updateBar() {
 let result = (totalMoneyCount / targetAmount) * 100;
 progressBar.style.width = result + '%';

 if (totalMoneyCount >= targetAmount) {
  modal.classList.remove('success');
  totalMoney.textContent = `$${format(targetAmount)}`;
  progressBar.style.width = '100%';
  disable();
 }
}

// Disable Buttons after total reached
function disable() {
 btnBack.disabled = true;
 btnBookmark.disabled = true;
 btnReward.forEach((btn) => {
  btn.disabled = true;
 });

 successTitle.textContent = 'We reached $100,000!';
 successText.textContent = 'Thank you for your support!';
 btnGot.textContent = 'Home';
}

function updateRemainingNumbers(number) {
 number.forEach((number) => {
  number.textContent -= 1;
 });
}

// Update UI
function updateUI() {
 countBackers();
 updateBar();
}

////////////////////////////////////////////////////////
// Event Listeners

// Back Project
btnBack.addEventListener('click', () => {
 showModal();
});

// Close modal
btnClose.addEventListener('click', () => {
 closeModal();
 unChecked();
});

btnBookmark.addEventListener('click', () => {
 bookmarkCheck();
});

// Hamburger
btnHamburger.addEventListener('click', (e) => {
 e.preventDefault();
 if (btnHamburger.classList.contains('open')) {
  btnHamburger.classList.remove('open');
  fadeEls.forEach((el) => {
   el.classList.remove('fade-in');
   el.classList.add('fade-out');
  });
 } else {
  btnHamburger.classList.add('open');
  fadeEls.forEach((el) => {
   el.classList.remove('fade-out');
   el.classList.add('fade-in');
  });
 }
});

// Radio Buttons
btnRadio.forEach((button) =>
 button.addEventListener('change', () => {
  btnRadio.forEach((btn) => {
   if (btn.checked) {
    btn.parentNode.classList.add('item');
    btn.parentNode.classList.add('border-active');
   } else {
    btn.parentNode.classList.remove('item');
    btn.parentNode.classList.remove('border-active');
   }
   if (button.id === 'radioBtn-1') {
    modal.classList.add('completed');
    success.scrollIntoView({ behavior: 'smooth' });
    totalBackers.textContent = backers + 1;
   }
  });
 })
);

// Choose Reward
btnReward.forEach((btn) =>
 btn.addEventListener('click', () => {
  modal.classList.add('show-modal');
  if (btn.id === 'reward-2') {
   document.querySelector('#item-2').classList.add('item');
   document.querySelector('.item').classList.toggle('border-active');
   document.querySelector('#item-2').scrollIntoView({ behavior: 'smooth' });
  }
  if (btn.id === 'reward-3') {
   document.querySelector('#item-3').classList.add('item');
   document.querySelector('.item').classList.toggle('border-active');
   document.querySelector('#item-3').scrollIntoView({ behavior: 'smooth' });
  }
 })
);

// Confirm Pledge
forms.forEach((btn) =>
 btn.addEventListener('submit', function (e) {
  e.preventDefault();

  let clicked = e.target;
  if (clicked === btnContinue1) {
   totalMoney.textContent = `$${format((totalMoneyCount += +input1.value))}`;
   updateUI();
   updateRemainingNumbers(numRemainingBamboo);
  }
  if (clicked === btnContinue2) {
   totalMoney.textContent = `$${format((totalMoneyCount += +input2.value))}`;
   updateUI();
   updateRemainingNumbers(numRemainingBlack);
  }

  modal.classList.add('completed');
  document.querySelector('.success').scrollIntoView({ behavior: 'smooth' });
 })
);

btnGot.addEventListener('click', () => {
 closeModal();
 modal.classList.remove('completed');
 unChecked();
});
