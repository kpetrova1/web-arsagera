'use strict';

import { processHashOnLoad, switchTab, updateUrlHash } from './utils.js';

export function tabs() {
  document.addEventListener('click', function (e) {
    const tabButton = e.target.closest('[data-tab]');
    if (!tabButton) return;

    const tabId = tabButton.getAttribute('data-tab');

    const isActionTab = !!tabButton.closest('[data-accordion-tabs]');

    const accordion = tabButton.closest('[data-accordion]');
    const isInsideAccordion = !!accordion;

    if (isActionTab && isInsideAccordion) {
      e.preventDefault();

      if (!accordion.classList.contains('is-active')) {
        accordion.classList.add('is-active');
      }

      const mainTabsContainer = accordion.querySelector('[data-accordion-content] [data-tabs]');
      if (mainTabsContainer) {
        switchTab(mainTabsContainer, tabId);

        updateUrlHash(tabId);
      }

      return;
    }

    const tabsContainer = tabButton.closest('[data-tabs]');
    if (!tabsContainer) return;

    switchTab(tabsContainer, tabId);

    if (isInsideAccordion && !isActionTab) {
      updateUrlHash(tabId, accordion);
    }
  });

  processHashOnLoad();
}
