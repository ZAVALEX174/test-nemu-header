document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('.header');
  const headerTop = header.querySelector('.header__top');
  const headerMiddle = header.querySelector('.header__middle');
  const headerDown = header.querySelector('.header__down');
  const heroSection = document.querySelector('.hero');

  let headerTopHeight = headerTop.offsetHeight;
  let headerDownHeight = headerDown.offsetHeight;
  let headerMiddleHeight = headerMiddle.offsetHeight;
  let scrollTop = 0;

  window.addEventListener('scroll', () => {
    scrollTop = window.scrollY;
    if (scrollTop > headerTopHeight) {
      headerMiddle.classList.add('pos-fixed');
      heroSection.style.marginTop = `(${headerDownHeight} + ${headerMiddleHeight})px`;
      headerDown.style.marginTop = `-${headerDownHeight}px`;
    } else {
      headerMiddle.classList.remove('pos-fixed');
      headerDown.style.marginTop = '';
    }
  })
})
