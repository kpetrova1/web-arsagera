'use strict';

import { processHashOnLoad, updateUrlHash } from './utils.js';

export function accordion() {
  // Обработчик кликов для аккордеонов
  document.addEventListener('click', (event) => {
    const currentLink = event.target.closest('[data-accordion-anchor]');
    if (!currentLink) return;

    const currentAccordion = currentLink.closest('[data-accordion]');
    if (!currentAccordion) return;

    // Переключаем состояние текущего аккордеона
    currentAccordion.classList.toggle('is-active');

    // Если есть хеш в ссылке, обновляем URL
    const anchor = currentLink.getAttribute('href');
    if (anchor && anchor.startsWith('#')) {
      updateUrlHash(anchor);
    }
  });

  // Обработка хеша при загрузке страницы
  processHashOnLoad();
}
