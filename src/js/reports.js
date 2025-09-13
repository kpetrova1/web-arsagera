// Styles
import '/src/css/reports.scss';

// Page scripts
import { sideMobileMenu } from './modules/sideMobileMenu.js';
import { accordion } from './modules/accordion.js';
import { tabs } from './modules/tabs.js';

document.addEventListener('DOMContentLoaded', function () {
  sideMobileMenu();
  accordion();
  tabs();
});
