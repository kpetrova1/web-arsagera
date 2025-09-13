// Styles
import '/src/css/product.scss';

// Page scripts
import { checkTableScroll } from './modules/checkTableScroll.js';
import { tabs } from './modules/tabs.js';
import { accordion } from './modules/accordion.js';
import { overflowTabs } from './modules/overflowTabs.js';
import { tableDrag } from './modules/tableDrag.js';

document.addEventListener('DOMContentLoaded', function () {
  tabs();
  accordion();
  overflowTabs();
  checkTableScroll();
  tableDrag();
});
