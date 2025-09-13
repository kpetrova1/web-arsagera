// Styles
import '/src/css/lectures.scss';

// Page scripts
import { poll } from './modules/poll.js';
import { sortButton } from './modules/sortButton.js';
import { filterMobile } from './modules/filterMobile.js';

document.addEventListener('DOMContentLoaded', function () {
  poll();
  sortButton();
  filterMobile();
});
