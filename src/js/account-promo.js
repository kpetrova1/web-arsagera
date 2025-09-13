// Styles
import '/src/css/account-promo.scss';

// Page scripts
import { sideMobileMenu } from './modules/sideMobileMenu.js';
import { tabs } from './modules/tabs.js';
import { checkTableScroll } from './modules/checkTableScroll.js';
import { tableDrag } from './modules/tableDrag.js';

document.addEventListener('DOMContentLoaded', function () {
  sideMobileMenu();
  tabs();
  checkTableScroll();
  tableDrag();
});
