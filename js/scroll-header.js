document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('.header');
  const headerTop = header.querySelector('.header__top');
  const headerMiddle = header.querySelector('.header__middle');
  const headerDown = header.querySelector('.header__down');
  const heroSection = document.querySelector('.hero');
  const catalog = document.querySelector('.catalog-list');
  const openCatalogBtn = document.querySelector('.catalog-open');
  const closeCatalogBtn = document.querySelector('.catalog-close');

  // скрытие и появление header
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

  // открытие и закрытие каталога
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

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeCatalog();
    }
  });

  openCatalogBtn.addEventListener('click', openCatalog);
  closeCatalogBtn.addEventListener('click', closeCatalog);

  // открытие и закрытие выпадающего меню
  const firstTabList = catalog.querySelectorAll('.catalog-item');
  const dropLists = catalog.querySelectorAll('.catalog-list-dropdonw');

  dropLists.forEach(drop => drop.classList.add('none'));

  if (firstTabList.length > 0) {
    firstTabList[0].classList.add('catalog-item-selected');
    const firstDrop = firstTabList[0].querySelector('.catalog-list-dropdonw');
    if (firstDrop) firstDrop.classList.remove('none');
  }

  firstTabList.forEach((firstTab) => {
    firstTab.addEventListener('click', (e) => {
      // 1. Снимаем выделение со всех элементов и скрываем все списки
      firstTabList.forEach(tab => {
        tab.classList.remove('catalog-item-selected');
        const drop = tab.querySelector('.catalog-list-dropdonw');
        if (drop) drop.classList.add('none');
      });

      firstTab.classList.add('catalog-item-selected');

      const currentDrop = firstTab.querySelector('.catalog-list-dropdonw');
      if (currentDrop) currentDrop.classList.remove('none');
    });
  });
})
