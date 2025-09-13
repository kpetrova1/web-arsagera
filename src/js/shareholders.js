// Styles
import '/src/css/shareholders.scss';

// Page scripts
import { sideMobileMenu } from './modules/sideMobileMenu.js';
import { accordion } from './modules/accordion.js';
import { tabs } from './modules/tabs.js';
import { tableSetCellHeight } from './modules/tableSetCellHeight.js';
import { tableDrag } from './modules/tableDrag.js';

document.addEventListener('DOMContentLoaded', function () {
  sideMobileMenu();
  tabs();
  tableSetCellHeight();
  tableDrag();
});
