'use strict';

export function checkTableScroll() {
  const wrappers = document.querySelectorAll('[data-table-scroll]');
  if (!wrappers.length) return;

  const update = (wrapper) => {
    const table = wrapper.querySelector('table');
    if (!table || !wrapper.isConnected) return;

    const wrapperWidth = wrapper.clientWidth;
    if (wrapperWidth === 0) return;

    const contentWidth = table.scrollWidth; // ширина содержимого таблицы
    if (contentWidth > wrapperWidth) {
      table.classList.add('has-scroll');
    } else {
      table.classList.remove('has-scroll');
    }
  };

  const roWrapper = new ResizeObserver((entries) => {
    for (const entry of entries) update(entry.target);
  });

  const roTable = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const wrapper = entry.target.closest('[data-table-scroll]');
      if (wrapper) update(wrapper);
    }
  });

  wrappers.forEach((wrapper) => {
    roWrapper.observe(wrapper);
    const table = wrapper.querySelector('table');
    if (table) roTable.observe(table);

    requestAnimationFrame(() => update(wrapper));
  });

  document.addEventListener('table:recalc', () => {
    wrappers.forEach(update);
  });
}
