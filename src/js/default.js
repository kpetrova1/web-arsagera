'use strict';
import { dropdown } from './modules/dropdown.js';
import { modal } from './modules/modal.js';
import { menuMobile } from './modules/menuMobile.js';
import { selectCategory } from './modules/selectCategory.js';
import { setActiveNav } from './modules/setActiveNav.js';
import { menuDropdown } from './modules/menuDropdown.js';

document.addEventListener('DOMContentLoaded', function () {
  dropdown('[data-auth-toggle]');
  dropdown('[data-categories-toggle]');
  menuDropdown();
  modal();
  menuMobile();
  selectCategory('[data-categories-toggle]', '[data-categories-link]');
  setActiveNav();
});
