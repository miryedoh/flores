////////////////////////////////////////////////////
//NAVIGATION
const header = document.querySelector('.header');
const nav = header.querySelector('.nav-container');
const navHeight = nav.getBoundingClientRect().height;

const navBtn = nav.querySelector('.btn-nav');
const navUl = nav.querySelector('.menu-container');

// STICKY nav
const stickyNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(stickyNav, obsOptions);
observer.observe(header);

//NAVIGATION collapse btn
navBtn.addEventListener('click', function () {
  navUl.classList.toggle('hidden');
  navBtn.classList.toggle('active');
});
