'use strict';

export function overflowTabs() {
  const wrappers = document.querySelectorAll('[data-accordion-tabs]');
  if (!wrappers.length) return;

  const EPS = 1; // допуск на субпиксели

  function getOuterWidth(el) {
    const cs = getComputedStyle(el);
    const ml = parseFloat(cs.marginLeft) || 0;
    const mr = parseFloat(cs.marginRight) || 0;
    return el.offsetWidth + ml + mr;
  }

  function ensureNav(wrapper) {
    let nav = wrapper.querySelector('.buttons');
    if (nav) return nav;

    nav = document.createElement('div');
    nav.classList.add('tab-scroll');

    const btnPrev = document.createElement('button');
    btnPrev.type = 'button';
    btnPrev.className = 'tab-scroll__button';
    btnPrev.setAttribute('data-tab-prev', '');
    btnPrev.setAttribute('aria-label', 'Прокрутить табы влево');
    btnPrev.innerHTML = `
      <svg viewBox="0 0 15 18" width="15" height="18" aria-hidden="true" style="transform: scaleX(-1)">
        <use href="/sprite.svg#triangle-right-icon" x="0" y="0"></use>
      </svg>
    `;

    const btnNext = document.createElement('button');
    btnNext.type = 'button';
    btnNext.className = 'tab-scroll__button';
    btnNext.setAttribute('data-tab-next', '');
    btnNext.setAttribute('aria-label', 'Прокрутить табы вправо');
    btnNext.innerHTML = `
       <svg viewBox="0 0 15 18" width="15" height="18" aria-hidden="true">
          <use href="/sprite.svg#triangle-right-icon" x="0" y="0"></use>
        </svg>
    `;

    nav.append(btnPrev, btnNext);
    wrapper.append(nav);
    return nav;
  }

  function updateButtonsState(inner, nav) {
    if (!nav) return;
    const btnPrev = nav.querySelector('[data-tab-prev]');
    const btnNext = nav.querySelector('[data-tab-next]');

    const maxScrollLeft = inner.scrollWidth - inner.clientWidth;
    const atStart = inner.scrollLeft <= EPS;
    const atEnd = inner.scrollLeft >= maxScrollLeft - EPS;

    btnPrev.disabled = atStart || inner.scrollWidth <= inner.clientWidth + EPS;
    btnNext.disabled = atEnd || inner.scrollWidth <= inner.clientWidth + EPS;
  }

  function scrollToHidden(inner, dir = 1) {
    // dir: 1 -> вправо (к первому скрытому справа), -1 -> влево (к последнему скрытому слева)
    const items = Array.from(inner.querySelectorAll('[data-tab]'));
    if (!items.length) return;

    const visibleLeft = inner.scrollLeft;
    const visibleRight = visibleLeft + inner.clientWidth;

    if (dir > 0) {
      // первый скрытый справа: его правая граница > visibleRight (или хотя бы часть выходит за правый край)
      const target = items.find((el) => {
        const left = el.offsetLeft;
        const right = left + el.offsetWidth;
        return right > visibleRight + EPS; // элемент выходит за правую границу
      });

      if (target) {
        // прокрутка на его «скрытую ширину»
        const left = target.offsetLeft;
        const hiddenWidth = left + target.offsetWidth - visibleRight; // насколько он "спрятан" справа
        const step = Math.max(0, hiddenWidth);
        inner.scrollBy({ left: step, behavior: 'smooth' });
      } else {
        // ничего быстрее не найдено — доскроллим к самому концу на остаток
        const rest = inner.scrollWidth - visibleRight;
        if (rest > EPS) inner.scrollBy({ left: rest, behavior: 'smooth' });
      }
    } else {
      // последний скрытый слева: его левая граница < visibleLeft
      const hiddenLeftItems = items.filter((el) => el.offsetLeft < visibleLeft - EPS);
      const target = hiddenLeftItems.length ? hiddenLeftItems[hiddenLeftItems.length - 1] : null;

      if (target) {
        // «скрытая ширина» слева — на сколько зайти назад, чтобы целиком его показать
        const left = target.offsetLeft;
        const hiddenWidth = visibleLeft - left; // сколько ушло за левую границу
        const step = Math.max(0, hiddenWidth);
        inner.scrollBy({ left: -step, behavior: 'smooth' });
      } else {
        // нет скрытых слева — едем в самый старт, если нужно
        if (visibleLeft > EPS) inner.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  }

  function bindNav(wrapper, inner, nav) {
    if (inner.dataset.tabsNavBound === 'true') return;
    inner.dataset.tabsNavBound = 'true';

    const btnPrev = nav.querySelector('[data-tab-prev]');
    const btnNext = nav.querySelector('[data-tab-next]');

    btnPrev.addEventListener('click', () => {
      scrollToHidden(inner, -1);
    });
    btnNext.addEventListener('click', () => {
      scrollToHidden(inner, 1);
    });

    inner.addEventListener('scroll', () => updateButtonsState(inner, nav), { passive: true });
    window.addEventListener('resize', () => updateButtonsState(inner, nav));
  }

  function checkAccordionTabs() {
    wrappers.forEach((wrapper) => {
      const inner = wrapper.querySelector('[data-accordion-tabs-inner]');
      if (!inner) return;

      const items = inner.querySelectorAll('[data-tab]');
      if (!items.length) return;

      const isOverflow = inner.scrollWidth > inner.clientWidth + EPS;

      wrapper.classList.toggle('is-overflow', isOverflow);

      const nav = wrapper.querySelector('.tab-scroll');

      if (isOverflow && !nav) {
        const nav = ensureNav(wrapper);
        bindNav(wrapper, inner, nav);
        updateButtonsState(inner, nav);
      } else {
        if (nav) nav.remove();
        inner.dataset.tabsNavBound = 'false';
        inner.scrollLeft = 0;
      }
    });
  }

  checkAccordionTabs();

  window.addEventListener('resize', checkAccordionTabs);
}
