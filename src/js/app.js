// Unified app entry
// Styles (unified entry that bundles all pages and components)
import '/src/css/app.scss';

// Modules
import { dropdown } from './modules/dropdown.js';
import { modal } from './modules/modal.js';
import { menuMobile } from './modules/menuMobile.js';
import { selectCategory } from './modules/selectCategory.js';
import { accordion } from './modules/accordion.js';
import { tabs } from './modules/tabs.js';
import { autoResizeTextareas } from './modules/autoResizeTextareas.js';
import { poll } from './modules/poll.js';

document.addEventListener('DOMContentLoaded', () => {
  // global
  dropdown('[data-dropdown-button]');
  dropdown('[data-category-button]');
  dropdown('[data-about-link]');
  modal();
  menuMobile();
  selectCategory('[data-category-button]', '[data-categories-link]');

  // feature-detected modules
  if (document.querySelector('[data-accordion]')) {
    accordion();
  }
  if (document.querySelector('[data-tabs]')) {
    tabs();
  }
  if (document.querySelector('textarea[data-autosize]')) {
    autoResizeTextareas();
  }
  if (document.querySelector('[data-poll]')) {
    poll();
  }
});
