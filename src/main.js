////////////////////////////////////////////////////
//SECTION CONTROL
const allSections = document.querySelectorAll('.section');

const loadSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(loadSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});

////////////////////////////////////////////////////
//SECTION 3
//데이터 가져오기
const loadData = () => {
  return fetch(`./data/product.json`)
    .then((res) => res.json())
    .then((data) => data.products);
};

//아이템들을 보여주기
function chageHTML(i) {
  return `
  <li class="product-container">
  <img src="${i.image}" alt="${i.name}">
  <div class="product-info">
    <h5>${i.name}</h5>
    <p>${i.description}</p>
  </div>
</li>
  `;
}

function displayItem(items) {
  const productUl = document.querySelector('.product-ul');
  productUl.innerHTML = items.map((i) => chageHTML(i)).join('');
}

/// 탭버튼 컨트롤
const btnControll = (e, obj) => {
  const el = e.target;
  const clicked = el.dataset.value;
  const allTabs = document.querySelectorAll('.tab-btn');

  if (!clicked) return;

  allTabs.forEach((t) => t.classList.remove('btn-active'));
  el.classList.add('btn-active');

  displayItem(obj[clicked]);
};

//가져온 데이터 내보내기
let obj = {};

loadData().then((products) => {
  const flower = products.filter((el) => el.type === 'flower');
  const plant = products.filter((el) => el.type === 'plant');
  const cactus = products.filter((el) => el.type === 'cactus');
  displayItem(plant);

  const itemObj = { flower, plant, cactus };
  obj = { ...itemObj };
  return obj;
});

const btns = document.querySelector('.tab-container');
btns.addEventListener('click', (e) => btnControll(e, obj));
