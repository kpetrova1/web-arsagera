// Styles
import '/src/css/log.scss';

// Page scripts
import { sideMobileMenu } from './modules/sideMobileMenu.js';
import { checkTableScroll } from './modules/checkTableScroll.js';
import { tableDrag } from './modules/tableDrag.js';

document.addEventListener('DOMContentLoaded', function () {
  sideMobileMenu();
  checkTableScroll();
  tableDrag();
});
