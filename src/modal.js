////////////////////////////////////////////////////
//변수 선택
//MODAL
const modalBtns = document.querySelectorAll('.modal-btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
//가격
const planBox = document.querySelector('.plan-choose_container');
const displayPrice = document.querySelector('.total-price');
const modalPriceBtns = document.querySelectorAll('.price-btn');
const priceBox = document.querySelector('.total-price_container');
//FORM
const form = document.querySelector('.modal-form_container');
const nombre = form.querySelector('#name');
const phone = form.querySelector('#phone');
const email = form.querySelector('#email');
const address = form.querySelector('#address');
const submitBtn = form.querySelector('.submit-btn');
const inputs = form.querySelectorAll('input');

////////////////////////////////////////////////////
//MODAL HANDLER on&off
function modalReset() {
  modalPriceBtns.forEach((el) => el.classList.remove('choosed'));
  displayPrice.innerText = 0;
  nombre.value = '';
  phone.value = '';
  email.value = '';
  address.value = '';
}

function modalHandler() {
  modal.classList.toggle('modal-hidden');
  overlay.classList.toggle('modal-hidden');

  modalReset();
}

modalBtns.forEach((modalBtn) =>
  modalBtn.addEventListener('click', modalHandler)
);

closeBtn.addEventListener('click', modalHandler);
overlay.addEventListener('click', modalHandler);
window.addEventListener('keydown', function (e) {
  if (!modal.classList.contains('modal-hidden')) {
    if (e.code === 'Escape') {
      modalHandler();
      modalReset();
    }
  }
});

////////////////////////////////////////////////////
//가격 디스플레이 관련 기능
function modalControl(e, className) {
  const clicked = e.target.closest(className);
  if (!clicked) return;

  const data = clicked.dataset;

  displayPrice.innerText = data.value;

  modalPriceBtns.forEach((el) => {
    el.classList.remove('choosed');
    if (el.value === data.key) {
      el.classList.add('choosed');
    }
  });
}

priceBox.addEventListener('click', (e) => modalControl(e, '.modal-btn'));
planBox.addEventListener('click', (e) => modalControl(e, '.price-btn'));

////////////////////////////////////////////////////
//FORM HANDLER

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (displayPrice.innerText === '0') {
    displayPrice.innerText = '🚨플랜을 선택해주세요.';
  } else {
    inputs.forEach((el) => (el.disabled = true));
    submitBtn.disabled = true;

    const alertBox = document.createElement('div');
    alertBox.innerHTML = `현재 프로젝트에서는 결제 기능을 지원하지 않습니다. <br />참여해주셔서 감사합니다 :) 이 창은 <b>3초</b> 후 만료됩니다.  `;
    alertBox.classList.add('alert');
    modal.prepend(alertBox);

    setTimeout(function () {
      modalHandler();
      alertBox.remove();
      inputs.forEach((el) => (el.disabled = false));
      submitBtn.disabled = false;
    }, 3000);
  }
  
});
