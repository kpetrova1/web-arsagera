'use strict';

export function overflowTabs() {
  const wrappers = document.querySelectorAll('[data-accordion-tabs]');
  if (!wrappers.length) return;

  const EPS = 2; // допуск на субпиксели

  function ensureNav(wrapper) {
    let nav = wrapper.querySelector('.tab-scroll');
    if (nav) return nav;

    nav = document.createElement('div');
    nav.classList.add('tab-scroll');

    const btnPrev = document.createElement('button');
    btnPrev.type = 'button';
    btnPrev.className = 'tab-scroll__button';
    btnPrev.dataset.tabPrev = '';
    btnPrev.setAttribute('aria-label', 'Прокрутить табы влево');
    btnPrev.innerHTML = `
      <svg viewBox="0 0 15 18" width="15" height="18" aria-hidden="true" style="transform: scaleX(-1)">
        <use href="/sprite.svg#triangle-right-icon"></use>
      </svg>
    `;

    const btnNext = document.createElement('button');
    btnNext.type = 'button';
    btnNext.className = 'tab-scroll__button';
    btnNext.dataset.tabNext = '';
    btnNext.setAttribute('aria-label', 'Прокрутить табы вправо');
    btnNext.innerHTML = `
      <svg viewBox="0 0 15 18" width="15" height="18" aria-hidden="true">
        <use href="/sprite.svg#triangle-right-icon"></use>
      </svg>
    `;

    nav.append(btnPrev, btnNext);
    wrapper.append(nav);

    return nav;
  }

  function updateButtonsState(inner, nav) {
    const btnPrev = nav.querySelector('[data-tab-prev]');
    const btnNext = nav.querySelector('[data-tab-next]');

    const scrollW = Math.ceil(inner.scrollWidth);
    const clientW = Math.floor(inner.clientWidth);
    const maxScrollLeft = scrollW - clientW;

    const atStart = inner.scrollLeft <= EPS;
    const atEnd = inner.scrollLeft >= maxScrollLeft - EPS;

    const noOverflow = scrollW <= clientW + EPS;

    btnPrev.disabled = atStart || noOverflow;
    btnNext.disabled = atEnd || noOverflow;
  }

  function scrollToHidden(inner, dir = 1) {
    const items = Array.from(inner.querySelectorAll('[data-tab]'));
    if (!items.length) return;

    const visibleLeft = inner.scrollLeft;
    const visibleRight = visibleLeft + inner.clientWidth;

    if (dir > 0) {
      const target = items.find(el => {
        const left = el.offsetLeft;
        const right = left + el.offsetWidth;
        return right > visibleRight + EPS;
      });

      if (target) {
        inner.scrollTo({
          left: target.offsetLeft,
          behavior: 'smooth'
        });
      } else {
        inner.scrollTo({ left: inner.scrollWidth, behavior: 'smooth' });
      }
    } else {
      const hiddenLeftItems = items.filter(
          el => el.offsetLeft + el.offsetWidth < visibleLeft - EPS
      );
      const target = hiddenLeftItems[hiddenLeftItems.length - 1];

      if (target) {
        inner.scrollTo({
          left: target.offsetLeft,
          behavior: 'smooth'
        });
      } else {
        inner.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  }

  function bindNav(inner, nav) {
    if (inner.dataset.tabsNavBound === 'true') return;
    inner.dataset.tabsNavBound = 'true';

    const btnPrev = nav.querySelector('[data-tab-prev]');
    const btnNext = nav.querySelector('[data-tab-next]');

    btnPrev.addEventListener('click', () => scrollToHidden(inner, -1));
    btnNext.addEventListener('click', () => scrollToHidden(inner, 1));

    inner.addEventListener('scroll', () => updateButtonsState(inner, nav));
  }

  function check(wrapper) {
    const inner = wrapper.querySelector('[data-accordion-tabs-inner]');
    if (!inner) return;

    const nav = ensureNav(wrapper); // теперь создаём один раз
    bindNav(inner, nav);

    const scrollW = Math.ceil(inner.scrollWidth);
    const clientW = Math.floor(inner.clientWidth);

    const isOverflow = scrollW - clientW > EPS;

    if (isOverflow) {
      wrapper.classList.add('is-overflow');
      nav.classList.remove('is-hidden');
      updateButtonsState(inner, nav);
    } else {
      wrapper.classList.remove('is-overflow');
      nav.classList.add('is-hidden');
      inner.scrollLeft = 0;
    }
  }

  const run = () => wrappers.forEach(check);

  run();
  window.addEventListener('resize', run);
}
