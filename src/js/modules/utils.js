'use strict';

export function closeOtherAccordions(currentAccordion) {
  const allAccordions = document.querySelectorAll('[data-accordion]');
  allAccordions.forEach((acc) => {
    if (acc !== currentAccordion && acc.classList.contains('is-active')) {
      acc.classList.remove('is-active');
    }
  });
}

export function switchTab(tabsContainer, tabId) {
  const tabButtons = tabsContainer.querySelectorAll(':scope > ul [data-tab]');
  const tabContents = tabsContainer.querySelectorAll(':scope > [data-tab-content]');
  const accordionContainer = tabsContainer.closest('[data-accordion]');

  const scrollYBefore = window.scrollY;

  tabButtons.forEach((button) => button.classList.remove('is-active'));
  tabContents.forEach((content) => content.classList.remove('is-active'));

  const activeButton = tabsContainer.querySelector(`[data-tab="${tabId}"]`);
  const activeContent = tabsContainer.querySelector(`#${tabId}`);

  if (activeButton) activeButton.classList.add('is-active');
  if (activeContent) activeContent.classList.add('is-active');

  requestAnimationFrame(() => {
    window.scrollTo(0, scrollYBefore);

    if (accordionContainer) {
      const accordionRect = accordionContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (accordionRect.top < 0 || accordionRect.bottom > viewportHeight) {
        accordionContainer.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }
    }
  });
}

export function updateUrlHash(id) {
  window.location.hash = id;
}

function splitHash(hash) {
  const cleanHash = hash.startsWith('#') ? hash.slice(1) : hash;
  const parts = cleanHash.split('-');
  const result = [];

  let current = '';

  for (let i = 0; i < parts.length; i++) {
    current = current ? `${current}-${parts[i]}` : parts[i];
    result.push(current);
  }

  return result;
}

export function processHashOnLoad() {
  const hash = window.location.hash;
  if (!hash) return;

  closeOtherAccordions(null);

  const ids = splitHash(hash);

  ids
    .map((id) => document.querySelector(`[data-tab-buttons] [href="#${id}"], [href="#${id}"][data-accordion-anchor]`))
    .filter(Boolean)
    .forEach((anchor, index) => {
      const parent = anchor.closest('[data-tabs], [data-accordion]');
      if (!parent) return;

      if (parent.hasAttribute('data-accordion')) {
        parent.classList.add('is-active');
        parent.scrollIntoView({
          behavior: 'smooth',
        });
      } else if (parent.hasAttribute('data-tabs')) {
        switchTab(parent, ids[index]);
      }
    });
}
