'use strict';

export function tableSetCellHeight() {
  const tableFixed = document.querySelector('[data-table-fixed]');
  const tableScroll = document.querySelector('[data-table-scroll]');

  const fixedHeadRows = tableFixed.querySelectorAll('thead tr');
  const scrollHeadRows = tableScroll.querySelectorAll('thead tr');

  const fixedRows = tableFixed.querySelectorAll('tbody tr');
  const scrollRows = tableScroll.querySelectorAll('tbody tr');

  function syncTableHeights() {
    // Синхронизация шапки
    if (fixedHeadRows.length === 1 && scrollHeadRows.length === 2) {
      const fixedHead = fixedHeadRows[0];
      const scrollHead1 = scrollHeadRows[0];
      const scrollHead2 = scrollHeadRows[1];

      const fixedHeight = fixedHead.offsetHeight;
      const scrollHeight = scrollHead1.offsetHeight + scrollHead2.offsetHeight;
      const maxHeight = Math.max(fixedHeight, scrollHeight);

      // левая шапка = вся высота
      fixedHead.style.height = maxHeight + 'px';

      // правая шапка распределяется по пропорции
      const part = maxHeight / 2;
      scrollHead1.style.height = part + 'px';
      scrollHead2.style.height = part + 'px';
    }

    // Синхронизация строк тела таблицы

    fixedRows.forEach((row, i) => {
      const fixedHeight = row.offsetHeight;
      const scrollHeight = scrollRows[i]?.offsetHeight || 0;
      const maxHeight = Math.max(fixedHeight, scrollHeight);

      row.style.height = maxHeight + 'px';
      if (scrollRows[i]) scrollRows[i].style.height = maxHeight + 'px';
    });
  }

  // запуск при загрузке
  window.addEventListener('load', syncTableHeights);
  window.addEventListener('resize', syncTableHeights);
}
