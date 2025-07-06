document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('.header');
  const headerTop = header.querySelector('.header__top');
  const headerMiddle = header.querySelector('.header__middle');
  const headerDown = header.querySelector('.header__down');
  const heroSection = document.querySelector('.hero');
  const catalog = document.querySelector('.catalog-list');
  const openCatalogBtn = document.querySelector('#catalog-open');
  const closeCatalogBtn = document.querySelector('#catalog-close');
  const closeMobileMenuBtn = document.querySelector('#catalog-close-mobile');
  const openMenuMobileBtn = document.querySelector('#catalog-open-mobile');

  // скрытие и появление header
  let headerTopHeight = headerTop.offsetHeight;
  let headerDownHeight = headerDown.offsetHeight;
  let headerMiddleHeight = headerMiddle.offsetHeight;
  let scrollTop = 0;

  catalog.style.top = `${header.offsetHeight}px`;

  window.addEventListener('scroll', () => {
    scrollTop = window.scrollY;
    if (window.innerWidth <= 1024) {
      return
    } else {
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
    }
  })

  // открытие и закрытие каталога
  function openCatalog(e) {
    e.stopPropagation();
    catalog.style.display = 'flex';
    openCatalogBtn.classList.add('none');
    closeCatalogBtn.style.display = 'flex';
    // document.body.style.overflow = 'hidden';
  }

  function closeCatalog(e) {
    if (e) e.stopPropagation();
    catalog.style.display = 'none';
    closeCatalogBtn.style.display = 'none';
    openCatalogBtn.classList.remove('none');
    // document.body.style.overflow = 'auto';
    dropLists.forEach(drop => drop.classList.add('none'));
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
  const catalogWrapper = header.querySelector('.catalog');
  const menuList = headerDown.querySelector('.menu-list');

  dropLists.forEach(drop => drop.classList.add('none'));

  if(window.innerWidth >= 1024) {
    if (firstTabList.length > 0) {
      firstTabList[0].classList.add('catalog-item-selected');
      const firstDrop = firstTabList[0].querySelector('.catalog-list-dropdonw');
      if (firstDrop) firstDrop.classList.remove('none');
    }
  }

  firstTabList.forEach((firstTab) => {
    firstTab.addEventListener('click', (e) => {

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

  // перенос элементов
  const address = document.querySelector('.navigation-address');
  const pages = document.querySelector('.navigation-pages');
  const social = document.querySelector('.social');
  const logo = document.querySelector('.logo');
  const workingHours = document.querySelector('.navigation-working-hours');
  const headerMobile = document.querySelector('.header__mobile-wrapper');

  const mediaQuery = window.matchMedia('(max-width: 1024px)');

  // открытие меню в мобильной версии
  function openMobileMenuHeader() {
    headerMobile.style.display = 'grid';
    openMenuMobileBtn.style.display = 'none';
    closeMobileMenuBtn.style.display = 'flex';
  }

  function closeMobileMenuHeader() {
    headerMobile.style.display = 'none';
    openMenuMobileBtn.style.display = 'flex';
    closeMobileMenuBtn.style.display = 'none';
  }

  openMenuMobileBtn.addEventListener('click', openMobileMenuHeader);
  closeMobileMenuBtn.addEventListener('click', closeMobileMenuHeader);

  function handleTabletChange(e) {
    if (e.matches) {

      headerMobile.appendChild(address);
      headerMobile.appendChild(headerDown);
      headerMobile.appendChild(workingHours);
      headerMobile.appendChild(pages);
      headerMobile.appendChild(social);
      menuList.prepend(openCatalogBtn);
      catalog.prepend(closeCatalogBtn);

      window.removeEventListener('scroll', () => {
        headerMiddle.classList.remove('pos-fixed');
        headerDown.style.marginTop = '';
      });

    } else {

      headerTop.prepend(address);
      headerTop.append(workingHours);
      headerMiddle.append(social);
      headerTop.append(pages);
      header.append(headerDown);
      catalogWrapper.prepend(openCatalogBtn);
      catalogWrapper.prepend(closeCatalogBtn);

    }
  }

  handleTabletChange(mediaQuery);
  mediaQuery.addEventListener('change', handleTabletChange);

  const menu = document.querySelector(".menu__list");
  const subMenu = menu.querySelector(".submenu__list-box--larg");
  const subMenuIlem = subMenu.querySelectorAll(".submenu__link");
  // const subMenuIlemLarg = subMenu.querySelectorAll(".submenu__item--larg");

  subMenuIlem[0].classList.add("submenu__link--active");

  for (let z = 0; z < subMenuIlem.length; z++) {
    subMenuIlem[z].nextElementSibling.style.zIndex = z + 1;
  }

// Добавляем обработчик для каждого элемента
  subMenuIlem.forEach(item => {
    item.addEventListener('mouseenter', function() {
      // 1. Удаляем активный класс у ВСЕХ элементов
      subMenuIlem.forEach(el => el.classList.remove("submenu__link--active"));

      // 2. Добавляем активный класс текущему элементу
      this.classList.add("submenu__link--active");
    });
  });

})
