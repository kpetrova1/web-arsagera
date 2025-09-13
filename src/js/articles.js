// Styles
import '/src/css/articles.scss';

// Page scripts
import { poll } from './modules/poll.js';
import { filterMobile } from './modules/filterMobile.js';
import { sortDropdown } from './modules/sortDropdown.js';

document.addEventListener('DOMContentLoaded', function () {
  poll();
  filterMobile();
  sortDropdown();
});
