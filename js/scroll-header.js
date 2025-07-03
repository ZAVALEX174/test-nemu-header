document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('.header');
  const headerTop = header.querySelector('.header__top');
  const headerMiddle = header.querySelector('.header__middle');
  const headerDown = header.querySelector('.header__down');
  const heroSection = document.querySelector('.hero');
  const catalog = document.querySelector('.catalog-list');
  const openCatalogBtn = document.querySelector('.catalog-open');
  const closeCatalogBtn = document.querySelector('.catalog-close');

  let headerTopHeight = headerTop.offsetHeight;
  let headerDownHeight = headerDown.offsetHeight;
  let headerMiddleHeight = headerMiddle.offsetHeight;
  let scrollTop = 0;

  catalog.style.top = `${header.offsetHeight}px`;

  window.addEventListener('scroll', () => {
    scrollTop = window.scrollY;
    if (scrollTop > headerTopHeight) {
      headerMiddle.classList.add('pos-fixed');
      heroSection.style.marginTop = `(${headerDownHeight} + ${headerMiddleHeight})px`;
      headerDown.style.marginTop = `-${headerDownHeight}px`;
      catalog.style.top = `${headerMiddleHeight}px`;

    } else {
      headerMiddle.classList.remove('pos-fixed');
      headerDown.style.marginTop = '';
      catalog.style.top = `${header.offsetHeight}px`;
    }
  })

  const openCatalog = function (e) {
    e.stopPropagation();
    catalog.style.display = 'flex';
    openCatalogBtn.style.display = 'none';
    closeCatalogBtn.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  const closeCatalog = function (e) {
    if (e) e.stopPropagation();
    catalog.style.display = 'none';
    closeCatalogBtn.style.display = 'none';
    openCatalogBtn.style.display = 'flex';
    document.body.style.overflow = 'auto';
  }

  window.addEventListener('click', (e) => {
    if (!e.target.closest('.catalog-list') &&
      !e.target.closest('.catalog-open')) {
      closeCatalog();
    }
  });

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeCatalog();
  }
});

  openCatalogBtn.addEventListener('click', openCatalog);
  closeCatalogBtn.addEventListener('click', closeCatalog);


  openCatalogBtn.addEventListener('click', openCatalog);
  closeCatalogBtn.addEventListener('click', closeCatalog);


})
