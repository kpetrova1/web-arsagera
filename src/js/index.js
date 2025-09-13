// Styles
import '/src/css/index.scss';

// Page scripts
import { checkTableScroll } from './modules/checkTableScroll.js';
import { poll } from './modules/poll.js';
import { accordion } from './modules/accordion.js';

document.addEventListener('DOMContentLoaded', function () {
  checkTableScroll();
  accordion();
  poll();
});
